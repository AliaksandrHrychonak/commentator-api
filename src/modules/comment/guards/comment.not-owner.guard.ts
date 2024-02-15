import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';
import { ICommentDoc } from 'src/modules/comment/interfaces/comment.interface';
import { ENUM_COMMENT_STATUS_CODE_ERROR } from 'src/modules/comment/constants/comment.status-code.constant';

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
