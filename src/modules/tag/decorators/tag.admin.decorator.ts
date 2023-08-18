import { applyDecorators, UseGuards } from '@nestjs/common';
import { TagPutToRequestGuard } from '../guards/payload/tag.payload.put-to-request.guard';
import { TagNotFoundGuard } from '../guards/tag.not-found.guard';

export function TagAdminGetGuard(): MethodDecorator {
    return applyDecorators(UseGuards(TagPutToRequestGuard, TagNotFoundGuard));
}

export function TagAdminCreateGuard(): MethodDecorator {
    return applyDecorators(UseGuards());
}

export function TagAdminDeleteGuard(): MethodDecorator {
    return applyDecorators(UseGuards(TagPutToRequestGuard, TagNotFoundGuard));
}

export function TagAdminUpdateGuard(): MethodDecorator {
    return applyDecorators(UseGuards(TagPutToRequestGuard, TagNotFoundGuard));
}
