import {
    Response,
    ResponsePaging,
} from '../../../common/response/decorators/response.decorator';
import { ResponseIdSerialization } from '../../../common/response/serializations/response.id.serialization';
import { PolicyAbilityProtected } from '../../../common/policy/decorators/policy.decorator';
import {
    ENUM_POLICY_ACTION,
    ENUM_POLICY_SUBJECT,
} from '../../../common/policy/constants/policy.enum.constant';
import { GetUser, UserProtected } from '../../user/decorators/user.decorator';
import { AuthJwtAccessProtected } from '../../../common/auth/decorators/auth.jwt.decorator';
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
import { UserDoc } from '../../user/repository/entities/user.entity';
import {
    IResponse,
    IResponsePaging,
} from '../../../common/response/interfaces/response.interface';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../../common/auth/services/auth.service';
import { PaginationService } from '../../../common/pagination/services/pagination.service';
import { CommentService } from '../services/comment.service';
import { CommentDoc } from '../repository/entities/comment.entity';
import { CommentUserCreateDto } from '../dtos/comment.user-create.dto';
import { RequestParamGuard } from '../../../common/request/decorators/request.decorator';
import {
    CommentAuthUserProtected,
    GetComment,
} from '../decorators/comment.decorator';
import { CommentRequestDto } from '../dtos/comment.request.dto';
import { CategoryService } from '../../category/services/category.service';
import { TagService } from '../../tag/services/tag.service';
import { ENUM_COMMENT_STATUS_CODE_ERROR } from '../constants/comment.status-code.constant';
import { HelperArrayService } from '../../../common/helper/services/helper.array.service';
import { CommentUpdateDto } from '../dtos/comment.update.dto';

import {
    PaginationQuery,
    PaginationQueryFilterEqualObjectId,
} from '../../../common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from '../../../common/pagination/dtos/pagination.list.dto';
import { CommentListSerialization } from '../serializations/comment.list.serialization';
import {
    COMMENT_AUTH_USER_AVAILABLE_ORDER_BY,
    COMMENT_AUTH_USER_AVAILABLE_SEARCH,
    COMMENT_DEFAULT_ORDER_BY,
    COMMENT_DEFAULT_ORDER_DIRECTION,
    COMMENT_DEFAULT_PER_PAGE,
} from '../constants/comment.list.constant';
import { ICommentEntity } from '../interfaces/comment.interface';
@ApiTags('modules.admin.comment')
@Controller({
    version: '1',
    path: '/comment',
})
export class CommentAuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly paginationService: PaginationService,
        private readonly helperArrayService: HelperArrayService,
        private readonly commentService: CommentService,
        private readonly categoryService: CategoryService,
        private readonly tagService: TagService
    ) {}

    // @CommentAuthUserListDoc()
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
        @PaginationQueryFilterEqualObjectId('categories')
        categories: Record<string, any>,
        @PaginationQueryFilterEqualObjectId('tags')
        tags: Record<string, any>
    ): Promise<IResponsePaging> {
        const find: Record<string, any> = {
            ..._search,
            ...tags,
            ...categories,
            owner: ownerId,
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

    // @CommentAuthUserCreateDoc()
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
        @GetUser() { _id }: UserDoc,
        @Body() { name, value, tags, categories }: CommentUserCreateDto
    ): Promise<IResponse> {
        const checkDuplicateTags = tags && this.helperArrayService.unique(tags);

        const checkDuplicateCategories =
            categories && this.helperArrayService.unique(categories);

        if (checkDuplicateTags) {
            const belongByOwnerId = await this.tagService.belongByOwnerId(
                checkDuplicateTags,
                _id,
                {}
            );

            if (!belongByOwnerId) {
                throw new NotFoundException({
                    statusCode:
                        ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_NOT_FOUND_TAG_ERROR,
                    message: 'comment.error.notFoundTag',
                });
            }
        }

        if (checkDuplicateCategories) {
            const belongByOwnerId = await this.categoryService.belongByOwnerId(
                checkDuplicateCategories,
                _id,
                {}
            );

            if (!belongByOwnerId) {
                throw new NotFoundException({
                    statusCode:
                        ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_NOT_FOUND_CATEGORY_ERROR,
                    message: 'comment.error.notFoundCategory',
                });
            }
        }

        const created: CommentDoc = await this.commentService.create({
            name,
            value,
            tags: checkDuplicateTags,
            categories: checkDuplicateCategories,
            owner: _id,
        });

        return {
            data: { _id: created._id },
        };
    }

    // @CategoryAdminGetDoc()
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

    // @CategoryAuthUserUpdateDoc()
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
        @GetUser() { _id }: UserDoc,
        @GetComment() comment: CommentDoc,
        @Body() { name, value, tags, categories }: CommentUpdateDto
    ): Promise<IResponse> {
        const uniqueTags = tags && this.helperArrayService.unique(tags);

        const uniqueCategories =
            categories && this.helperArrayService.unique(categories);

        if (uniqueTags) {
            const belongByOwnerId = await this.tagService.belongByOwnerId(
                uniqueTags,
                _id,
                {}
            );

            if (!belongByOwnerId) {
                throw new NotFoundException({
                    statusCode:
                        ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_NOT_FOUND_TAG_ERROR,
                    message: 'comment.error.notFoundTag',
                });
            }
        }

        if (uniqueCategories) {
            const belongByOwnerId = await this.categoryService.belongByOwnerId(
                uniqueCategories,
                _id,
                {}
            );

            if (!belongByOwnerId) {
                throw new NotFoundException({
                    statusCode:
                        ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_NOT_FOUND_CATEGORY_ERROR,
                    message: 'comment.error.notFoundCategory',
                });
            }
        }

        await this.commentService.update(comment, {
            name,
            value,
            tags: uniqueTags,
            categories: uniqueCategories,
        });

        return {
            data: { _id: comment._id },
        };
    }

    // @CategoryAuthUserDeleteDoc()
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
