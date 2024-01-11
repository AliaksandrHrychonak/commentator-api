import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import { PaginationService } from '../../../common/pagination/services/pagination.service';
import {
    Response,
    ResponsePaging,
} from '../../../common/response/decorators/response.decorator';
import { CategoryListSerialization } from '../serializations/category.list.serialization';
import { PolicyAbilityProtected } from '../../../common/policy/decorators/policy.decorator';
import {
    ENUM_POLICY_ACTION,
    ENUM_POLICY_SUBJECT,
} from '../../../common/policy/constants/policy.enum.constant';
import { GetUser, UserProtected } from '../../user/decorators/user.decorator';
import { AuthJwtAccessProtected } from '../../../common/auth/decorators/auth.jwt.decorator';
import { UserDoc } from '../../user/repository/entities/user.entity';
import { PaginationQuery } from '../../../common/pagination/decorators/pagination.decorator';
import {
    CATEGORY_AUTH_USER_AVAILABLE_ORDER_BY,
    CATEGORY_AUTH_USER_AVAILABLE_SEARCH,
    CATEGORY_DEFAULT_ORDER_BY,
    CATEGORY_DEFAULT_ORDER_DIRECTION,
    CATEGORY_DEFAULT_PER_PAGE,
} from '../constants/category.list.constant';
import { PaginationListDto } from '../../../common/pagination/dtos/pagination.list.dto';
import {
    IResponse,
    IResponsePaging,
} from '../../../common/response/interfaces/response.interface';
import { ICategoryEntity } from '../interfaces/category.interface';
import {
    CategoryAuthUserCreateDoc,
    CategoryAuthUserDeleteDoc,
    CategoryAuthUserListDoc,
    CategoryAuthUserUpdateDoc,
} from '../docs/category.auth.doc';
import { ResponseIdSerialization } from '../../../common/response/serializations/response.id.serialization';
import { CategoryUserCreateDto } from '../dtos/category.user-create.dto';

import {
    CategoryAuthUserProtected,
    GetCategory,
} from '../decorators/category.decorator';
import { RequestParamGuard } from '../../../common/request/decorators/request.decorator';
import { CategoryRequestDto } from '../dtos/category.request.dto';
import { CategoryUpdateDto } from '../dtos/category.update.dto';
import { CategoryDoc } from '../repository/entities/category.entity';

@ApiTags('modules.auth.category')
@Controller({
    version: '1',
    path: '/category',
})
export class CategoryAuthController {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly paginationService: PaginationService
    ) {}

    @CategoryAuthUserListDoc()
    @ResponsePaging('category.list', {
        serialization: CategoryListSerialization,
    })
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.CATEGORY,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @UserProtected()
    @AuthJwtAccessProtected()
    @Get('/list')
    async listPagination(
        @GetUser() { _id: ownerId }: UserDoc,
        @PaginationQuery(
            CATEGORY_DEFAULT_PER_PAGE,
            CATEGORY_DEFAULT_ORDER_BY,
            CATEGORY_DEFAULT_ORDER_DIRECTION,
            CATEGORY_AUTH_USER_AVAILABLE_SEARCH,
            CATEGORY_AUTH_USER_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDto
    ): Promise<IResponsePaging> {
        const find: Record<string, any> = {
            ..._search,
            owner: ownerId,
        };

        const categories: ICategoryEntity[] =
            await this.categoryService.findAll(find, {
                paging: {
                    limit: _limit,
                    offset: _offset,
                },
                order: _order,
            });
        const total: number = await this.categoryService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        return {
            _pagination: { total, totalPage },
            data: categories,
        };
    }

    @CategoryAuthUserCreateDoc()
    @Response('category.create', {
        serialization: ResponseIdSerialization,
    })
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.CATEGORY,
        action: [ENUM_POLICY_ACTION.CREATE],
    })
    @UserProtected()
    @AuthJwtAccessProtected()
    @Post('/create')
    async create(
        @GetUser() { _id }: UserDoc,
        @Body() { name, description }: CategoryUserCreateDto
    ): Promise<IResponse> {
        const created: CategoryDoc = await this.categoryService.create({
            name,
            description,
            owner: _id,
        });

        return {
            data: { _id: created._id },
        };
    }

    @CategoryAuthUserUpdateDoc()
    @Response('category.update', {
        serialization: ResponseIdSerialization,
    })
    @CategoryAuthUserProtected()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.CATEGORY,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    })
    @AuthJwtAccessProtected()
    @RequestParamGuard(CategoryRequestDto)
    @Patch('/update/:category')
    async update(
        @GetCategory() category: CategoryDoc,
        @Body()
        body: CategoryUpdateDto
    ): Promise<IResponse> {
        await this.categoryService.update(category, body);

        return {
            data: { _id: category._id },
        };
    }

    @CategoryAuthUserDeleteDoc()
    @Response('category.delete')
    @CategoryAuthUserProtected()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.CATEGORY,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.DELETE],
    })
    @AuthJwtAccessProtected()
    @RequestParamGuard(CategoryRequestDto)
    @Delete('/delete/:category')
    async delete(@GetCategory() category: CategoryDoc): Promise<void> {
        await this.categoryService.delete(category);

        return;
    }
}
