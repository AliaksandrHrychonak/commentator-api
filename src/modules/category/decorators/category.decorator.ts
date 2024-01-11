import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    UseGuards,
} from '@nestjs/common';
import { IRequestApp } from '../../../common/request/interfaces/request.interface';
import { UserPayloadPutToRequestGuard } from '../../user/guards/payload/user.payload.put-to-request.guard';
import { UserNotFoundGuard } from '../../user/guards/user.not-found.guard';
import { CategoryPutToRequestGuard } from '../guards/payload/category.payload.put-to-request.guard';
import { CategoryNotFoundGuard } from '../guards/category.not-found.guard';
import { CategoryNotOwnerGuard } from '../guards/category.not-owner.guard';
import {
    CategoryDoc,
    CategoryEntity,
} from '../repository/entities/category.entity';

export const GetCategory = createParamDecorator(
    (
        returnPlain: boolean,
        ctx: ExecutionContext
    ): CategoryDoc | CategoryEntity => {
        const { __category } = ctx
            .switchToHttp()
            .getRequest<IRequestApp & { __category: CategoryDoc }>();
        return returnPlain ? __category.toObject() : __category;
    }
);

export function CategoryAuthUserProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPayloadPutToRequestGuard,
            UserNotFoundGuard,
            CategoryPutToRequestGuard,
            CategoryNotFoundGuard,
            CategoryNotOwnerGuard
        )
    );
}
