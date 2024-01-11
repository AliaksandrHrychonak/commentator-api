import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { CategoryService } from '../../services/category.service';
import { CategoryDoc } from '../../repository/entities/category.entity';

@Injectable()
export class CategoryPutToRequestGuard implements CanActivate {
    constructor(private readonly categoryService: CategoryService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<IRequestApp & { __category: CategoryDoc }>();
        const { params } = request;
        const { category } = params;

        const check: CategoryDoc = await this.categoryService.findOneById(
            category,
            {
                join: true,
            }
        );
        request.__category = check;

        return true;
    }
}
