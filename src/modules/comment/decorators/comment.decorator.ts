import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    UseGuards,
} from '@nestjs/common';
import {
    CommentDoc,
    CommentEntity,
} from 'src/modules/comment/repository/entities/comment.entity';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { UserPayloadPutToRequestGuard } from 'src/modules/user/guards/payload/user.payload.put-to-request.guard';
import { UserNotFoundGuard } from 'src/modules/user/guards/user.not-found.guard';
import { CommentPutToRequestGuard } from 'src/modules/comment/guards/payload/comment.payload.put-to-request.guard';
import { CommentNotFoundGuard } from 'src/modules/comment/guards/comment.not-found.guard';
import { CommentNotOwnerGuard } from 'src/modules/comment/guards/comment.not-owner.guard';

export const GetComment = createParamDecorator(
    (
        returnPlain: boolean,
        ctx: ExecutionContext
    ): CommentDoc | CommentEntity => {
        const { __comment } = ctx
            .switchToHttp()
            .getRequest<IRequestApp & { __comment: CommentDoc }>();
        return returnPlain ? __comment.toObject() : __comment;
    }
);

export function CommentAuthUserProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPayloadPutToRequestGuard,
            UserNotFoundGuard,
            CommentPutToRequestGuard,
            CommentNotFoundGuard,
            CommentNotOwnerGuard
        )
    );
}
