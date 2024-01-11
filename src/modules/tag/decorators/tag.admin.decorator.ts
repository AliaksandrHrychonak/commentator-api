import { applyDecorators, UseGuards } from '@nestjs/common';
import { TagPutToRequestGuard } from '../guards/payload/tag.payload.put-to-request.guard';
import { TagNotFoundGuard } from '../guards/tag.not-found.guard';
import { UserPutToRequestGuard } from '../../user/guards/user.put-to-request.guard';
import { UserNotFoundGuard } from '../../user/guards/user.not-found.guard';

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
