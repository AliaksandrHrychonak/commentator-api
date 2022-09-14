import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotFoundException,
} from '@nestjs/common';
import { ENUM_COMMENT_STATUS_CODE_ERROR } from '../constants/comment.status-code.constant';

@Injectable()
export class CommentNotFoundGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { __comment } = context.switchToHttp().getRequest();

        if (!__comment) {
            throw new NotFoundException({
                statusCode: ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_NOT_FOUND_ERROR,
                message: 'comment.error.notFound',
            });
        }

        return true;
    }
}
