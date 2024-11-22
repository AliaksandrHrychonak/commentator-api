import { ApiTags } from '@nestjs/swagger';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    SerializeOptions,
    UploadedFile,
} from '@nestjs/common';
import { AuthService } from '../../../common/auth/services/auth.service';
import { PaginationService } from '../../../common/pagination/services/pagination.service';
import { TagService } from '../services/tag.service';
import { Response } from 'src/common/response/decorators/response.decorator';
import {
    ResponseFile,
    ResponsePaging,
} from '../../../common/response/decorators/response.decorator';
import { TagListSerialization } from '../serializations/tag.list.serialization';
import { PolicyAbilityProtected } from '../../../common/policy/decorators/policy.decorator';
import {
    ENUM_POLICY_ACTION,
    ENUM_POLICY_SUBJECT,
} from '../../../common/policy/constants/policy.enum.constant';
import {
    AuthJwtAccessProtected,
    AuthJwtAdminAccessProtected,
} from '../../../common/auth/decorators/auth.jwt.decorator';
import {
    PaginationQuery,
    PaginationQueryFilterEqualObjectId,
} from '../../../common/pagination/decorators/pagination.decorator';
import {
    TAG_DEFAULT_AVAILABLE_ORDER_BY,
    TAG_DEFAULT_AVAILABLE_SEARCH,
    TAG_DEFAULT_ORDER_BY,
    TAG_DEFAULT_ORDER_DIRECTION,
    TAG_DEFAULT_PER_PAGE,
} from '../constants/tag.list.constant';
import { PaginationListDto } from '../../../common/pagination/dtos/pagination.list.dto';
import {
    IResponse,
    IResponsePaging,
} from '../../../common/response/interfaces/response.interface';
import { ITagEntity } from '../interfaces/tag.interface';
import {
    TagAdminCreateDoc,
    TagAdminDeleteDoc,
    TagAdminExportDoc,
    TagAdminGetDoc,
    TagAdminImportDoc,
    TagAdminListDoc,
    TagAdminUpdateDoc,
} from '../docs/tag.admin.doc';
import {
    TagAdminCreateGuard,
    TagAdminDeleteGuard,
    TagAdminGetGuard,
    TagAdminUpdateGuard,
} from '../decorators/tag.admin.decorator';
import { RequestParamGuard } from '../../../common/request/decorators/request.decorator';
import { TagRequestDto } from '../dtos/tag.request.dto';
import { GetTag } from '../decorators/tag.decorator';
import { TagDoc } from '../repository/entities/tag.entity';
import { ResponseIdSerialization } from '../../../common/response/serializations/response.id.serialization';
import { ENUM_HELPER_FILE_TYPE } from '../../../common/helper/constants/helper.enum.constant';
import { FileRequiredPipe } from '../../../common/file/pipes/file.required.pipe';
import { FileSizeExcelPipe } from '../../../common/file/pipes/file.size.pipe';
import { FileTypeExcelPipe } from '../../../common/file/pipes/file.type.pipe';
import { FileExtractPipe } from '../../../common/file/pipes/file.extract.pipe';
import { FileValidationPipe } from '../../../common/file/pipes/file.validation.pipe';
import { TagImportDto } from '../dtos/tag.import.dto';
import { IFileExtract } from '../../../common/file/interfaces/file.interface';
import { UploadFileSingle } from '../../../common/file/decorators/file.decorator';
import { TagUpdateDto } from '../dtos/tag.update.dto';
import { TagListExportSerialization } from '../serializations/tag.list-export.serialization';
import { UserDoc } from '../../user/repository/entities/user.entity';
import { GetUser } from '../../user/decorators/user.decorator';
import { UserRequestDto } from '../../user/dtos/user.request.dto';
import { TagUserCreateDto } from '../dtos/tag.user-create.dto';

@ApiTags('modules.admin.tag')
@Controller({
    version: '1',
    path: '/tag',
})
export class TagAdminController {
    constructor(
        private readonly authService: AuthService,
        private readonly paginationService: PaginationService,
        private readonly tagService: TagService
    ) {}

    @TagAdminListDoc()
    @ResponsePaging('tag.list', {
        serialization: TagListSerialization,
    })
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TAG,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @AuthJwtAccessProtected()
    @Get('/list')
    async list(
        @PaginationQuery(
            TAG_DEFAULT_PER_PAGE,
            TAG_DEFAULT_ORDER_BY,
            TAG_DEFAULT_ORDER_DIRECTION,
            TAG_DEFAULT_AVAILABLE_SEARCH,
            TAG_DEFAULT_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDto,
        @PaginationQueryFilterEqualObjectId('owner')
        owner: Record<string, any>
    ): Promise<IResponsePaging> {
        const find: Record<string, any> = {
            ..._search,
            ...owner,
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

    @TagAdminGetDoc()
    // TODO add Serialize (fix bug "RangeError: Maximum call stack size exceeded")
    @SerializeOptions({})
    @Response('tag.get')
    @TagAdminGetGuard()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TAG,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(TagRequestDto)
    @Get('/get/:tag')
    async get(@GetTag() tag: TagDoc): Promise<IResponse> {
        return { data: tag };
    }

    @TagAdminCreateDoc()
    @Response('tag.create', {
        serialization: ResponseIdSerialization,
    })
    @TagAdminCreateGuard()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TAG,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.CREATE],
    })
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(UserRequestDto)
    @Post('/create/:user')
    async create(
        @Body()
        { name, description }: TagUserCreateDto,
        @GetUser() user: UserDoc
    ): Promise<IResponse> {
        const created: TagDoc = await this.tagService.create({
            name,
            description,
            owner: user._id,
        });

        return {
            data: { _id: created._id },
        };
    }

    @TagAdminUpdateDoc()
    @Response('tag.update', {
        serialization: ResponseIdSerialization,
    })
    @TagAdminUpdateGuard()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TAG,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    })
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(TagRequestDto)
    @Put('/update/:tag')
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

    @TagAdminDeleteDoc()
    @Response('tag.delete')
    @TagAdminDeleteGuard()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TAG,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.DELETE],
    })
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(TagRequestDto)
    @Delete('/delete/:tag')
    async delete(@GetTag() tag: TagDoc): Promise<void> {
        await this.tagService.delete(tag);

        return;
    }

    @TagAdminImportDoc()
    @Response('tag.import')
    @UploadFileSingle('file')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TAG,
        action: [
            ENUM_POLICY_ACTION.READ,
            ENUM_POLICY_ACTION.CREATE,
            ENUM_POLICY_ACTION.IMPORT,
        ],
    })
    @AuthJwtAdminAccessProtected()
    @Post('/import')
    async import(
        @UploadedFile(
            FileRequiredPipe,
            FileSizeExcelPipe,
            FileTypeExcelPipe,
            FileExtractPipe,
            new FileValidationPipe<TagImportDto>(TagImportDto)
        )
        file: IFileExtract<TagImportDto>
    ): Promise<void> {
        await this.tagService.import(file.dto);

        return;
    }

    @TagAdminExportDoc()
    @ResponseFile({
        serialization: TagListExportSerialization,
        fileType: ENUM_HELPER_FILE_TYPE.CSV,
    })
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TAG,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.EXPORT],
    })
    @AuthJwtAdminAccessProtected()
    @HttpCode(HttpStatus.OK)
    @Post('/export')
    async export(): Promise<IResponse> {
        const tags: ITagEntity[] = await this.tagService.findAll({});

        return { data: tags };
    }
}
