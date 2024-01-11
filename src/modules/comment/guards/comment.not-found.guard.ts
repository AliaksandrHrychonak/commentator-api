import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { IRequestApp } from '../../../common/request/interfaces/request.interface';
import { ENUM_COMMENT_STATUS_CODE_ERROR } from '../constants/comment.status-code.constant';
import { CommentDoc } from '../repository/entities/comment.entity';

@Injectable()
export class CommentNotFoundGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { __comment } = context
            .switchToHttp()
            .getRequest<IRequestApp & { __comment: CommentDoc }>();
        if (!__comment) {
            throw new NotFoundException({
                statusCode:
                    ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_NOT_FOUND_ERROR,
                message: 'comment.error.notFound',
            });
        }

        return true;
    }
}
