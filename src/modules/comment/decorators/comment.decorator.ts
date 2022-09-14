import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common';
import { ICommentDocument } from '../comment.interface';
import { CommentNotFoundGuard } from '../guards/comment.not-found.guard';
import { CommentPutToRequestGuard } from '../guards/comment.put-to-request.guard';


export function CommentDeleteGuard(): any {
    return applyDecorators(UseGuards(CommentPutToRequestGuard, CommentNotFoundGuard));
}

export const GetComment = createParamDecorator(
    (data: string, ctx: ExecutionContext): ICommentDocument => {
        const { __comment } = ctx.switchToHttp().getRequest();
        return __comment;
    }
);

export function CommentUpdateGuard(): any {
    return applyDecorators(
        UseGuards(
            CommentPutToRequestGuard,
            CommentNotFoundGuard
        )
    );
}