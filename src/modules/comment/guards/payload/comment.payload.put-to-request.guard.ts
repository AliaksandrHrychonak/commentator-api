import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { CommentService } from 'src/modules/comment/services/comment.service';
import { CommentDoc } from 'src/modules/comment/repository/entities/comment.entity';

@Injectable()
export class CommentPutToRequestGuard implements CanActivate {
    constructor(private readonly commentService: CommentService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<IRequestApp & { __comment: CommentDoc }>();
        const { params } = request;
        const { comment } = params;

        const check: CommentDoc = await this.commentService.findOneById(
            comment
            // {
            //     join: true,
            // }
        );
        request.__comment = check;

        return true;
    }
}
