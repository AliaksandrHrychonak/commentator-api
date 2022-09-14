import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from '@nestjs/common';
import { TagNotFoundGuard } from '../guards/tag.not-found.guard';
import { TagPutToRequestGuard } from '../guards/tag.put-to-request.guard';
import { ITagDocument } from '../tag.interface';

export function TagDeleteGuard(): any {
    return applyDecorators(UseGuards(TagPutToRequestGuard, TagNotFoundGuard));
}

export const GetTag = createParamDecorator(
    (data: string, ctx: ExecutionContext): ITagDocument => {
        const { __tag } = ctx.switchToHttp().getRequest();
        return __tag;
    }
);
