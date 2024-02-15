import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    UseGuards,
} from '@nestjs/common';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { TagDoc, TagEntity } from 'src/modules/tag/repository/entities/tag.entity';
import { TagPutToRequestGuard } from 'src/modules/tag/guards/payload/tag.payload.put-to-request.guard';
import { TagNotFoundGuard } from 'src/modules/tag/guards/tag.not-found.guard';
import { TagNotOwnerGuard } from 'src/modules/tag/guards/tag.not-owner.guard';
import { UserPayloadPutToRequestGuard } from 'src/modules/user/guards/payload/user.payload.put-to-request.guard';
import { UserNotFoundGuard } from 'src/modules/user/guards/user.not-found.guard';
export const GetTag = createParamDecorator(
    (returnPlain: boolean, ctx: ExecutionContext): TagDoc | TagEntity => {
        const { __tag } = ctx
            .switchToHttp()
            .getRequest<IRequestApp & { __tag: TagDoc }>();
        return returnPlain ? __tag.toObject() : __tag;
    }
);

export function TagAuthUserProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPayloadPutToRequestGuard,
            UserNotFoundGuard,
            TagPutToRequestGuard,
            TagNotFoundGuard,
            TagNotOwnerGuard
        )
    );
}
