import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    InternalServerErrorException,
    NotFoundException,
    BadRequestException,
    Patch,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { createConnection } from 'net';
import { ENUM_AUTH_PERMISSIONS } from 'src/common/auth/constants/auth.enum.permission.constant';
import { User } from 'src/common/auth/decorators/auth.decorator';
import {
    AuthAdminJwtGuard,
    AuthJwtGuard,
} from 'src/common/auth/decorators/auth.jwt.decorator';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { HelperArrayService } from 'src/common/helper/services/helper.array.service';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
import {
    Response,
    ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/response.interface';
import { ENUM_TAG_STATUS_CODE_ERROR } from 'src/modules/tag/constants/tag.status-code.constant';
import { TagDocument } from 'src/modules/tag/schemas/tag.schema';
import { TagService } from 'src/modules/tag/services/tag.service';
import { IUserDocument } from 'src/modules/user/user.interface';
import { ICommentDocument } from '../comment.interface';
import { ENUM_COMMENT_STATUS_CODE_ERROR } from '../constants/comment.status-code.constant';
import {
    CommentDeleteGuard,
    CommentUpdateGuard,
    GetComment,
} from '../decorators/comment.decorator';
import { CommentCreateDto } from '../dtos/comment.create.dto';
import { CommentListDto } from '../dtos/comment.list.dto';
import { CommentRequestDto } from '../dtos/comment.request.dto';
import { CommentUpdateTagDto } from '../dtos/comment.update-tag.dto';
import { CommentUpdateDto } from '../dtos/comment.update.dto';
import { CommentDocument } from '../schemas/comment.schema';
import { CommentListSerialization } from '../serializations/comment.list.serialization';
import { CommentService } from '../services/comment.service';

@Controller({
    version: '1',
    path: '/comment',
})
export class CommentController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly commentService: CommentService,
        private readonly tagService: TagService,
        private readonly helperArrayService: HelperArrayService
    ) {}

    @ResponsePaging('comment.list', {
        classSerialization: CommentListSerialization,
    })
    @AuthJwtGuard()
    @Get('/list')
    async list(
        @Query()
        {
            page,
            perPage,
            sort,
            search,
            availableSort,
            availableSearch,
            tags
        }: CommentListDto,
        @User() user: IUserDocument
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);
        const find: Record<string, any> = {
            owner: new Types.ObjectId(user._id),
            ...tags,
            ...search,
        };
        

        const comment: CommentDocument[] = await this.commentService.findAll(
            find,
            {
                skip: skip,
                limit: perPage,
                sort,
            }
        );

        const totalData: number = await this.commentService.getTotal(find);
        const totalPage: number = await this.paginationService.totalPage(
            totalData,
            perPage
        );

        return {
            totalData,
            totalPage,
            currentPage: page,
            perPage,
            availableSearch,
            availableSort,
            data: comment,
        };
    }

    @Response('comment.create')
    @AuthJwtGuard()
    @Post('/create')
    async create(
        @Body()
        { value, ...body }: CommentCreateDto,
        @User() user: IUserDocument
    ): Promise<IResponse> {
        if (body.tags) {
            for (const tag of body.tags) {
                const checkTag: TagDocument = await this.tagService.findOneById(
                    tag.toString()
                );
                if (!checkTag) {
                    throw new NotFoundException({
                        statusCode: ENUM_TAG_STATUS_CODE_ERROR.TAG_NOT_FOUND_ERROR,
                        message: 'tag.error.notFound',
                    });
                }

                if (checkTag.owner.toString() !== user._id) {
                    throw new ForbiddenException({
                        statusCode: ENUM_TAG_STATUS_CODE_ERROR.TAG_ACCESS_ERROR,
                        message: 'tag.error.noTagAccess',
                    });
                }
            }
        }

        try {
            const create = await this.commentService.create(
                value,
                user._id,
                body.tags
            );

            return {
                data: create,
            };
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
    }

    @Response('comment.update')
    @CommentUpdateGuard()
    @RequestParamGuard(CommentRequestDto)
    @AuthJwtGuard()
    @Put('/update/:comment')
    async update(
        @GetComment() comment: CommentDocument,
        @User() user: IUserDocument,
        @Body() body: CommentUpdateDto
    ): Promise<IResponse> {
        const check: ICommentDocument = await this.commentService.findOneById(
            comment._id
        );
        if (check.owner.toString() !== user._id) {
            throw new ForbiddenException({
                statusCode: ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_ACCESS_ERROR,
                message: 'comment.error.access',
            });
        }
        try {
            const update = await this.commentService.update(
                comment._id,
                body.value
            );

            return {
                data: update,
            };
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
    }

    @Response('comment.update')
    @CommentUpdateGuard()
    @RequestParamGuard(CommentRequestDto)
    @AuthJwtGuard()
    @Put('/add/tags/:comment')
    async addTags(
        @GetComment() comment: CommentDocument,
        @User() user: IUserDocument,
        @Body() body: CommentUpdateTagDto
    ): Promise<IResponse> {
        const check: ICommentDocument = await this.commentService.findOneById(
            comment._id
        );
        const checkTag: TagDocument = await this.tagService.findOneById(
            body.tag.toString()
        );
        if (check.owner.toString() !== user._id) {
            throw new ForbiddenException({
                statusCode: ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_ACCESS_ERROR,
                message: 'comment.error.access',
            });
        }
        if (!checkTag) {
            throw new NotFoundException({
                statusCode: ENUM_TAG_STATUS_CODE_ERROR.TAG_NOT_FOUND_ERROR,
                message: 'tag.error.notFound',
            });
        }
        if (checkTag.owner.toString() !== user._id) {
            throw new ForbiddenException({
                statusCode: ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_TAG_EXIST_ERROR,
                //ADD TAG Id Err
                message: 'tag.error.noTagAccess',
            });
        }
        const tags = check.tags.map(i => i.toString())
        if(this.helperArrayService.includes(tags, body.tag)) {
            throw new BadRequestException({
                statusCode: ENUM_TAG_STATUS_CODE_ERROR.TAG_ACCESS_ERROR,
                message: 'comment.error.tagExist',
            });
        }
        


        try {
            const update = await this.commentService.updateTags(
                comment._id,
                body.tag
            );

            return {
                data: update,
            };
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
    }

    @Response('comment.delete')
    @CommentUpdateGuard()
    @RequestParamGuard(CommentRequestDto)
    @AuthJwtGuard()
    @Delete('/remove/tags/:comment')
    async removeTags(
        @GetComment() comment: CommentDocument,
        @User() user: IUserDocument,
        @Body() body: CommentUpdateTagDto
    ): Promise<IResponse> {
        const check: ICommentDocument = await this.commentService.findOneById(
            comment._id
        );
        if (check.owner.toString() !== user._id) {
            throw new ForbiddenException({
                statusCode: ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_ACCESS_ERROR,
                message: 'comment.error.access',
            });
        }
        const tags = check.tags.map(i => i.toString())
        if(!this.helperArrayService.includes(tags, body.tag)) {
            throw new BadRequestException({
                statusCode: ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_TAG_NOT_EXIST_ERROR,
                message: 'comment.error.tagNoExist',
            });
        }

        try {
            await this.commentService.removeTags(
                comment._id,
                body.tag
            );

        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
        return
    }

    @Response('comment.delete')
    @CommentDeleteGuard()
    @RequestParamGuard(CommentRequestDto)
    @AuthJwtGuard()
    @Delete('/delete/:comment')
    async delete(
        @GetComment() comment: ICommentDocument,
        @User() user: IUserDocument
    ): Promise<void> {
        const check: ICommentDocument = await this.commentService.findOneById(
            comment._id
        );

        if (check.owner.toString() !== user._id) {
            throw new ForbiddenException({
                statusCode: ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_ACCESS_ERROR,
                message: 'comment.error.access',
            });
        }
        try {
            await this.commentService.deleteOneById(comment._id);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return;
    }
}
