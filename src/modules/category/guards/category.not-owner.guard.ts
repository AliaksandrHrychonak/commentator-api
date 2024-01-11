import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { IRequestApp } from '../../../common/request/interfaces/request.interface';
import { UserDoc } from '../../user/repository/entities/user.entity';
import { ICategoryDoc } from '../interfaces/category.interface';
import { ENUM_CATEGORY_STATUS_CODE_ERROR } from '../constants/category.status-code.constant';

@Injectable()
export class CategoryNotOwnerGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { __user, __category } = context
            .switchToHttp()
            .getRequest<
                IRequestApp & { __user: UserDoc; __category: ICategoryDoc }
            >();
        if (__category.owner._id !== __user._id) {
            throw new NotFoundException({
                statusCode:
                    ENUM_CATEGORY_STATUS_CODE_ERROR.CATEGORY_NOT_OWNER_ERROR,

                message: 'category.error.notOwner',
            });
        }

        return true;
    }
}
