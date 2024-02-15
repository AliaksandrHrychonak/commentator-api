import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotFoundException,
} from '@nestjs/common';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { TagDoc } from 'src/modules/tag/repository/entities/tag.entity';
import { ENUM_TAG_STATUS_CODE_ERROR } from 'src/modules/tag/constants/tag.status-code.constant';

@Injectable()
export class TagNotFoundGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { __tag } = context
            .switchToHttp()
            .getRequest<IRequestApp & { __tag: TagDoc }>();
        if (!__tag) {
            throw new NotFoundException({
                statusCode: ENUM_TAG_STATUS_CODE_ERROR.TAG_NOT_FOUND_ERROR,
                message: 'tag.error.notFound',
            });
        }

        return true;
    }
}
