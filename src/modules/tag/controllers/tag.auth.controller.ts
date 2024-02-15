import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthJwtAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import {
    Response,
    ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import { TagService } from 'src/modules/tag/services/tag.service';
import {
    TagAuthUserCreateDoc,
    TagAuthUserDeleteDoc,
    TagAuthUserListDoc,
    TagAuthUserUpdateDoc,
} from 'src/modules/tag/docs/tag.auth.doc';
import { TagDoc } from 'src/modules/tag/repository/entities/tag.entity';
import { GetTag, TagAuthUserProtected } from 'src/modules/tag/decorators/tag.decorator';
import { TagUpdateDto } from 'src/modules/tag/dtos/tag.update.dto';
import { GetUser, UserProtected } from 'src/modules/user/decorators/user.decorator';
import { PolicyAbilityProtected } from 'src/common/policy/decorators/policy.decorator';
import {
    ENUM_POLICY_ACTION,
    ENUM_POLICY_SUBJECT,
} from 'src/common/policy/constants/policy.enum.constant';
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';
import { TagUserCreateDto } from 'src/modules/tag/dtos/tag.user-create.dto';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto';
import {
    TAG_AUTH_USER_AVAILABLE_ORDER_BY,
    TAG_AUTH_USER_AVAILABLE_SEARCH,
    TAG_DEFAULT_ORDER_BY,
    TAG_DEFAULT_ORDER_DIRECTION,
    TAG_DEFAULT_PER_PAGE,
} from 'src/modules/tag/constants/tag.list.constant';
import { TagListSerialization } from 'src/modules/tag/serializations/tag.list.serialization';
import { ITagEntity } from 'src/modules/tag/interfaces/tag.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
import { TagRequestDto } from 'src/modules/tag/dtos/tag.request.dto';

@ApiTags('modules.auth.tag')
@Controller({
    version: '1',
    path: '/tag',
})
export class TagAuthController {
    constructor(
        private readonly tagService: TagService,
        private readonly paginationService: PaginationService
    ) {}

    @TagAuthUserListDoc()
    @ResponsePaging('tag.list', {
        serialization: TagListSerialization,
    })
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TAG,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @UserProtected()
    @AuthJwtAccessProtected()
    @Get('/list')
    async listPagination(
        @GetUser() { _id: ownerId }: UserDoc,
        @PaginationQuery(
            TAG_DEFAULT_PER_PAGE,
            TAG_DEFAULT_ORDER_BY,
            TAG_DEFAULT_ORDER_DIRECTION,
            TAG_AUTH_USER_AVAILABLE_SEARCH,
            TAG_AUTH_USER_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDto
    ): Promise<IResponsePaging> {
        const find: Record<string, any> = {
            ..._search,
            owner: ownerId,
        };

        const tags: ITagEntity[] = await this.tagService.findAll(find, {
            paging: {
                limit: _limit,
                offset: _offset,
            },
            order: _order,
        });
        const total: number = await this.tagService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        return {
            _pagination: { total, totalPage },
            data: tags,
        };
    }

    @TagAuthUserCreateDoc()
    @Response('tag.create', {
        serialization: ResponseIdSerialization,
    })
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TAG,
        action: [ENUM_POLICY_ACTION.CREATE],
    })
    @UserProtected()
    @AuthJwtAccessProtected()
    @Post('/create')
    async create(
        @GetUser() { _id }: UserDoc,
        @Body() { name, description }: TagUserCreateDto
    ): Promise<IResponse> {
        const created: TagDoc = await this.tagService.create({
            name,
            description,
            owner: _id,
        });

        return {
            data: { _id: created._id },
        };
    }

    @TagAuthUserUpdateDoc()
    @Response('tag.update', {
        serialization: ResponseIdSerialization,
    })
    @TagAuthUserProtected()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TAG,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    })
    @AuthJwtAccessProtected()
    @RequestParamGuard(TagRequestDto)
    @Patch('/update/:tag')
    async update(
        @GetTag() tag: TagDoc,
        @Body()
        body: TagUpdateDto
    ): Promise<IResponse> {
        await this.tagService.update(tag, body);

        return {
            data: { _id: tag._id },
        };
    }

    @TagAuthUserDeleteDoc()
    @Response('tag.delete')
    @TagAuthUserProtected()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TAG,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.DELETE],
    })
    @AuthJwtAccessProtected()
    @RequestParamGuard(TagRequestDto)
    @Delete('/delete/:tag')
    async delete(@GetTag() tag: TagDoc): Promise<void> {
        await this.tagService.delete(tag);

        return;
    }
}
