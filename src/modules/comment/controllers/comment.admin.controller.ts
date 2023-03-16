import {
    Body,
    Controller,
    InternalServerErrorException,
    Post,
} from '@nestjs/common';
import { ENUM_AUTH_PERMISSIONS } from 'src/common/auth/constants/auth.enum.permission.constant';
import { AuthAdminJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { Response } from 'src/common/response/decorators/response.decorator';
import { IResponse } from 'src/common/response/response.interface';
import { CommentService } from '../services/comment.service';

@Controller({
    version: '1',
    path: '/comment',
})
export class CommentAdminController {
    constructor(private readonly commentService: CommentService) {}

    @Response('comment.insert')
    @AuthAdminJwtGuard(ENUM_AUTH_PERMISSIONS.COMMENTS_INSERT)
    @Post('/insert')
    async create(
        @Body()
        { data, owner }
    ): Promise<IResponse> {
        try {
            const create = await this.commentService.insert(data, owner);

            return create;
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
    }
}
