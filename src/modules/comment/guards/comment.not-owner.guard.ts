import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { IRequestApp } from '../../../common/request/interfaces/request.interface';
import { UserDoc } from '../../user/repository/entities/user.entity';
import { ICommentDoc } from '../interfaces/comment.interface';
import { ENUM_COMMENT_STATUS_CODE_ERROR } from '../constants/comment.status-code.constant';

@Injectable()
export class CommentNotOwnerGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { __user, __comment } = context
            .switchToHttp()
            .getRequest<
                IRequestApp & { __user: UserDoc; __comment: ICommentDoc }
            >();
        if (__comment.owner !== __user._id) {
            throw new NotFoundException({
                statusCode:
                    ENUM_COMMENT_STATUS_CODE_ERROR.COMMENT_NOT_OWNER_ERROR,

                message: 'comment.error.notOwner',
            });
        }

        return true;
    }
}
