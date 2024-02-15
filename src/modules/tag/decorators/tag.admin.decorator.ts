import { applyDecorators, UseGuards } from '@nestjs/common';
import { TagPutToRequestGuard } from 'src/modules/tag/guards/payload/tag.payload.put-to-request.guard';
import { TagNotFoundGuard } from 'src/modules/tag/guards/tag.not-found.guard';
import { UserPutToRequestGuard } from 'src/modules/user/guards/user.put-to-request.guard';
import { UserNotFoundGuard } from 'src/modules/user/guards/user.not-found.guard';

export function TagAdminGetGuard(): MethodDecorator {
    return applyDecorators(UseGuards(TagPutToRequestGuard, TagNotFoundGuard));
}

export function TagAdminCreateGuard(): MethodDecorator {
    return applyDecorators(UseGuards(UserPutToRequestGuard, UserNotFoundGuard));
}

export function TagAdminDeleteGuard(): MethodDecorator {
    return applyDecorators(UseGuards(TagPutToRequestGuard, TagNotFoundGuard));
}

export function TagAdminUpdateGuard(): MethodDecorator {
    return applyDecorators(UseGuards(TagPutToRequestGuard, TagNotFoundGuard));
}
