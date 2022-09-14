import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotFoundException,
} from '@nestjs/common';
import { ENUM_TAG_STATUS_CODE_ERROR } from '../constants/tag.status-code.constant';

@Injectable()
export class TagNotFoundGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { __tag } = context.switchToHttp().getRequest();

        if (!__tag) {
            throw new NotFoundException({
                statusCode: ENUM_TAG_STATUS_CODE_ERROR.TAG_NOT_FOUND_ERROR,
                message: 'tag.error.notFound',
            });
        }

        return true;
    }
}
