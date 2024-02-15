import {
    Response,
    ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import { PolicyAbilityProtected } from 'src/common/policy/decorators/policy.decorator';
import {
    ENUM_POLICY_ACTION,
    ENUM_POLICY_SUBJECT,
} from 'src/common/policy/constants/policy.enum.constant';
import { GetUser, UserProtected } from 'src/modules/user/decorators/user.decorator';
import { AuthJwtAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Patch,
    Post,
    SerializeOptions,
} from '@nestjs/common';
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { ApiTags } from '@nestjs/swagger';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { CommentService } from 'src/modules/comment/services/comment.service';
import { CommentDoc } from 'src/modules/comment/repository/entities/comment.entity';
import { CommentUserCreateDto } from 'src/modules/comment/dtos/comment.user-create.dto';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
import {
    CommentAuthUserProtected,
    GetComment,
} from 'src/modules/comment/decorators/comment.decorator';
import { CommentRequestDto } from 'src/modules/comment/dtos/comment.request.dto';
import { TagService } from 'src/modules/tag/services/tag.service';
import { ENUM_COMMENT_STATUS_CODE_ERROR } from 'src/modules/comment/constants/comment.status-code.constant';
import { HelperArrayService } from 'src/common/helper/services/helper.array.service';
import { CommentUpdateDto } from 'src/modules/comment/dtos/comment.update.dto';

import {
    PaginationQuery, PaginationQueryFilterInObjectId, PaginationQueryFilterNinObjectId,
} from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto';
import { CommentListSerialization } from 'src/modules/comment/serializations/comment.list.serialization';
import {
    COMMENT_AUTH_USER_AVAILABLE_ORDER_BY,
    COMMENT_AUTH_USER_AVAILABLE_SEARCH,
    COMMENT_DEFAULT_ORDER_BY,
    COMMENT_DEFAULT_ORDER_DIRECTION,
    COMMENT_DEFAULT_PER_PAGE,
} from 'src/modules/comment/constants/comment.list.constant';
import { ICommentEntity } from 'src/modules/comment/interfaces/comment.interface';
import {
    CommentAuthUserCreateDoc,
    CommentAuthUserDeleteDoc,
    CommentAuthUserGetDoc,
    CommentAuthUserListDoc,
    CommentAuthUserUpdateDoc
} from "src/modules/comment/docs/comment.auth.doc";
@ApiTags('modules.auth.comment')
@Controller({
    version: '1',
    path: '/comment',
})
export class CommentAuthController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly helperArrayService: HelperArrayService,
        private readonly commentService: CommentService,
        private readonly tagService: TagService
    ) {}

    @CommentAuthUserListDoc()
    @ResponsePaging('comment.list', {
        serialization: CommentListSerialization,
    })
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.COMMENT,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @UserProtected()
    @AuthJwtAccessProtected()
    @Get('/list')
    async listPagination(
        @GetUser() { _id: ownerId }: UserDoc,
        @PaginationQuery(
            COMMENT_DEFAULT_PER_PAGE,
            COMMENT_DEFAULT_ORDER_BY,
            COMMENT_DEFAULT_ORDER_DIRECTION,
            COMMENT_AUTH_USER_AVAILABLE_SEARCH,
            COMMENT_AUTH_USER_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDto,
        @PaginationQueryFilterInObjectId('tags')
        tags: Record<string, any>,
        @PaginationQueryFilterNinObjectId('tags')
        disabledTags: Record<string, any>,
    ): Promise<IResponsePaging> {
        const find: Record<string, any> = {
          owner: ownerId,
          ..._search,
          ...tags,
          ...disabledTags,
        };

        const comments: ICommentEntity[] = await this.commentService.findAll(
               find,
            {
                paging: {
                    limit: _limit,
                    offset: _offset,
                },
                order: _order,
            }
        );
        const total: number = await this.commentService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        return {
            _pagination: { total, totalPage },
            data: comments,
        };
    }

    @CommentAuthUserCreateDoc()
    @Response('comment.create', {
        serialization: ResponseIdSerialization,
    })
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.COMMENT,
        action: [ENUM_POLICY_ACTION.CREATE],
    })
    @UserProtected()
    @AuthJwtAccessProtected()
    @Post('/create')
    async create(
        @GetUser() { _id: owner }: UserDoc,
        @Body() { name, value, tags }: CommentUserCreateDto
    ): Promise<IResponse> {
        const checkDuplicateTags = tags && this.helperArrayService.unique(tags);

        if (checkDuplicateTags) {
            const find: { _id: string, owner: string }[] = checkDuplicateTags.map(i => ({
                _id: i,
                owner
            }))
            const result = await this.tagService.belongListById(find)
            const check = this.helperArrayService.differenceBy(find, result, "_id")
            if (!!check.length) {
                throw new NotFoundException({
                    statusCode:
                    ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_NOT_FOUND_TAG_ERROR,
                    message: 'comment.error.notFoundTag' + check[0]._id,
                });
            }
        }

        const created: CommentDoc = await this.commentService.create({
            name,
            value,
            tags: checkDuplicateTags,
            owner,
        });

        return {
            data: { _id: created._id },
        };
    }

    @CommentAuthUserGetDoc()
    // TODO add Serialize (fix bug "RangeError: Maximum call stack size exceeded")
    @SerializeOptions({})
    @Response('comment.get')
    @CommentAuthUserProtected()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.COMMENT,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @AuthJwtAccessProtected()
    @RequestParamGuard(CommentRequestDto)
    @Get('/get/:comment')
    async get(@GetComment() comment: CommentDoc): Promise<IResponse> {
        return { data: comment };
    }

    @CommentAuthUserUpdateDoc()
    @Response('comment.update', {
        serialization: ResponseIdSerialization,
    })
    @CommentAuthUserProtected()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.COMMENT,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    })
    @AuthJwtAccessProtected()
    @RequestParamGuard(CommentRequestDto)
    @Patch('/update/:comment')
    async update(
        @GetUser() { _id: owner }: UserDoc,
        @GetComment() comment: CommentDoc,
        @Body() { name, value, tags }: CommentUpdateDto
    ): Promise<IResponse> {
        const checkDuplicateTags = tags && this.helperArrayService.unique(tags);

        if (checkDuplicateTags) {
            const find: { _id: string, owner: string }[] = checkDuplicateTags.map(i => ({
                _id: i,
                owner
            }))
            const result = await this.tagService.belongListById(find)
            const check = this.helperArrayService.differenceBy(find, result, "_id")
            if (!!check.length) {
                throw new NotFoundException({
                    statusCode:
                    ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_NOT_FOUND_TAG_ERROR,
                    message: 'comment.error.notFoundTag ' + check[0]._id,
                });
            }
        }

        await this.commentService.update(comment, {
            name,
            value,
            tags: checkDuplicateTags,
        });

        return {
            data: { _id: comment._id },
        };
    }

    @CommentAuthUserDeleteDoc()
    @Response('comment.delete')
    @CommentAuthUserProtected()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.COMMENT,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.DELETE],
    })
    @AuthJwtAccessProtected()
    @RequestParamGuard(CommentRequestDto)
    @Delete('/delete/:comment')
    async delete(@GetComment() comment: CommentDoc): Promise<void> {
        await this.commentService.delete(comment);

        return;
    }
}
