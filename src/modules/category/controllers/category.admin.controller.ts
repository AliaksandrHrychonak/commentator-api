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
import { CategoryService } from '../services/category.service';
import {
    CategoryAdminCreateDoc,
    CategoryAdminDeleteDoc,
    CategoryAdminExportDoc,
    CategoryAdminGetDoc,
    CategoryAdminImportDoc,
    CategoryAdminListDoc,
    CategoryAdminUpdateDoc,
} from '../docs/category.admin.doc';
import {
    Response,
    ResponseFile,
    ResponsePaging,
} from '../../../common/response/decorators/response.decorator';
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
    CATEGORY_DEFAULT_AVAILABLE_ORDER_BY,
    CATEGORY_DEFAULT_AVAILABLE_SEARCH,
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
    CategoryAdminCreateGuard,
    CategoryAdminDeleteGuard,
    CategoryAdminGetGuard,
    CategoryAdminUpdateGuard,
} from '../decorators/category.admin.decorator';
import { RequestParamGuard } from '../../../common/request/decorators/request.decorator';
import { CategoryRequestDto } from '../dtos/category.request.dto';
import { GetCategory } from '../decorators/category.decorator';
import { ResponseIdSerialization } from '../../../common/response/serializations/response.id.serialization';
import { UserRequestDto } from '../../user/dtos/user.request.dto';
import { CategoryUserCreateDto } from '../dtos/category.user-create.dto';
import { GetUser } from '../../user/decorators/user.decorator';
import { UserDoc } from '../../user/repository/entities/user.entity';
import { CategoryUpdateDto } from '../dtos/category.update.dto';
import { UploadFileSingle } from '../../../common/file/decorators/file.decorator';
import { FileRequiredPipe } from '../../../common/file/pipes/file.required.pipe';
import { FileSizeExcelPipe } from '../../../common/file/pipes/file.size.pipe';
import { FileTypeExcelPipe } from '../../../common/file/pipes/file.type.pipe';
import { FileExtractPipe } from '../../../common/file/pipes/file.extract.pipe';
import { FileValidationPipe } from '../../../common/file/pipes/file.validation.pipe';
import { CategoryImportDto } from '../dtos/category.import.dto';
import { IFileExtract } from '../../../common/file/interfaces/file.interface';
import { CategoryListExportSerialization } from '../serializations/category.list-export.serialization';
import { ENUM_HELPER_FILE_TYPE } from '../../../common/helper/constants/helper.enum.constant';
import { CategoryListSerialization } from '../serializations/category.list.serialization';
import { ApiTags } from '@nestjs/swagger';
import { CategoryDoc } from '../repository/entities/category.entity';

@ApiTags('modules.admin.category')
@Controller({
    version: '1',
    path: '/category',
})
export class CategoryAdminController {
    constructor(
        private readonly authService: AuthService,
        private readonly paginationService: PaginationService,
        private readonly categoryService: CategoryService
    ) {}

    @CategoryAdminListDoc()
    @ResponsePaging('category.list', {
        serialization: CategoryListSerialization,
    })
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.CATEGORY,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @AuthJwtAccessProtected()
    @Get('/list')
    async list(
        @PaginationQuery(
            CATEGORY_DEFAULT_PER_PAGE,
            CATEGORY_DEFAULT_ORDER_BY,
            CATEGORY_DEFAULT_ORDER_DIRECTION,
            CATEGORY_DEFAULT_AVAILABLE_SEARCH,
            CATEGORY_DEFAULT_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDto,
        @PaginationQueryFilterEqualObjectId('owner')
        owner: Record<string, any>
    ): Promise<IResponsePaging> {
        const find: Record<string, any> = {
            ..._search,
            ...owner,
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

    @CategoryAdminGetDoc()
    // TODO add Serialize (fix bug "RangeError: Maximum call stack size exceeded")
    @SerializeOptions({})
    @Response('category.get')
    @CategoryAdminGetGuard()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.CATEGORY,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(CategoryRequestDto)
    @Get('/get/:category')
    async get(@GetCategory() category: CategoryDoc): Promise<IResponse> {
        return { data: category };
    }

    @CategoryAdminCreateDoc()
    @Response('category.create', {
        serialization: ResponseIdSerialization,
    })
    @CategoryAdminCreateGuard()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.CATEGORY,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.CREATE],
    })
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(UserRequestDto)
    @Post('/create/:user')
    async create(
        @Body()
        { name, description }: CategoryUserCreateDto,
        @GetUser() user: UserDoc
    ): Promise<IResponse> {
        const created: CategoryDoc = await this.categoryService.create({
            name,
            description,
            owner: user._id,
        });

        return {
            data: { _id: created._id },
        };
    }

    @CategoryAdminUpdateDoc()
    @Response('category.update', {
        serialization: ResponseIdSerialization,
    })
    @CategoryAdminUpdateGuard()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.CATEGORY,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    })
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(CategoryRequestDto)
    @Put('/update/:category')
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

    @CategoryAdminDeleteDoc()
    @Response('category.delete')
    @CategoryAdminDeleteGuard()
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.CATEGORY,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.DELETE],
    })
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(CategoryRequestDto)
    @Delete('/delete/:category')
    async delete(@GetCategory() category: CategoryDoc): Promise<void> {
        await this.categoryService.delete(category);

        return;
    }

    @CategoryAdminImportDoc()
    @Response('category.import')
    @UploadFileSingle('file')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.CATEGORY,
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
            new FileValidationPipe<CategoryImportDto>(CategoryImportDto)
        )
        file: IFileExtract<CategoryImportDto>
    ): Promise<void> {
        await this.categoryService.import(file.dto);

        return;
    }

    @CategoryAdminExportDoc()
    @ResponseFile({
        serialization: CategoryListExportSerialization,
        fileType: ENUM_HELPER_FILE_TYPE.CSV,
    })
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.CATEGORY,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.EXPORT],
    })
    @AuthJwtAdminAccessProtected()
    @HttpCode(HttpStatus.OK)
    @Post('/export')
    async export(): Promise<IResponse> {
        const categories: ICategoryEntity[] =
            await this.categoryService.findAll({});

        return { data: categories };
    }
}
