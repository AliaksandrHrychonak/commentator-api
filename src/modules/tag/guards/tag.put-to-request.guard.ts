import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TagService } from '../services/tag.service';
import { ITagDocument } from '../tag.interface';

@Injectable()
export class TagPutToRequestGuard implements CanActivate {
    constructor(private readonly tagService: TagService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { params } = request;
        const { tag } = params;

        const check: ITagDocument =
            await this.tagService.findOneById<ITagDocument>(tag);
        request.__tag = check;

        return true;
    }
}
