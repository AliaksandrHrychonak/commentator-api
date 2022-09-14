import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ICommentDocument } from '../comment.interface';
import { CommentService } from '../services/comment.service';


@Injectable()
export class CommentPutToRequestGuard implements CanActivate {
    constructor(private readonly commentService: CommentService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { params } = request;
        const { comment } = params;

        const check: ICommentDocument =
            await this.commentService.findOneById<ICommentDocument>(comment);
        request.__comment = check;

        return true;
    }
}
