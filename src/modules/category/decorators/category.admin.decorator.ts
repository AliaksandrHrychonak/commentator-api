import { applyDecorators, UseGuards } from '@nestjs/common';
import { CategoryPutToRequestGuard } from '../guards/payload/category.payload.put-to-request.guard';
import { CategoryNotFoundGuard } from '../guards/category.not-found.guard';
import { UserPutToRequestGuard } from '../../user/guards/user.put-to-request.guard';
import { UserNotFoundGuard } from '../../user/guards/user.not-found.guard';

export function CategoryAdminGetGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(CategoryPutToRequestGuard, CategoryNotFoundGuard)
    );
}

export function CategoryAdminCreateGuard(): MethodDecorator {
    return applyDecorators(UseGuards(UserPutToRequestGuard, UserNotFoundGuard));
}

export function CategoryAdminDeleteGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(CategoryPutToRequestGuard, CategoryNotFoundGuard)
    );
}

export function CategoryAdminUpdateGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(CategoryPutToRequestGuard, CategoryNotFoundGuard)
    );
}
