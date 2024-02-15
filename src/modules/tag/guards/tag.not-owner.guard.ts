import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotFoundException,
} from '@nestjs/common';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';
import { ENUM_TAG_STATUS_CODE_ERROR } from 'src/modules/tag/constants/tag.status-code.constant';
import { ITagDoc } from 'src/modules/tag/interfaces/tag.interface';

@Injectable()
export class TagNotOwnerGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { __user, __tag } = context
            .switchToHttp()
            .getRequest<IRequestApp & { __user: UserDoc; __tag: ITagDoc }>();
        if (__tag.owner._id !== __user._id) {
            throw new NotFoundException({
                statusCode: ENUM_TAG_STATUS_CODE_ERROR.TAG_NOT_OWNER_ERROR,

                message: 'tag.error.notOwner',
            });
        }

        return true;
    }
}
