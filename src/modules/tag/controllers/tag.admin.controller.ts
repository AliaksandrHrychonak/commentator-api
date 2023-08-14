import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/common/auth/services/auth.service';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { UserService } from 'src/modules/user/services/user.service';
import { TagService } from '../services/tag.service';

// TODO @PolicyAbilityProtected, guards

@ApiTags('modules.admin.tag')
@Controller({
    version: '1',
    path: '/tag',
})
export class TagAdminController {
    constructor(
        private readonly authService: AuthService,
        private readonly paginationService: PaginationService,
        private readonly tagService: TagService,
        private readonly userService: UserService
    ) {}

    // @UserAdminListDoc()
    // @ResponsePaging('tag.list', {
    //     serialization: TagListSerialization,
    // })
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.TAG,
    //     action: [ENUM_POLICY_ACTION.READ],
    // })
    // @AuthJwtAccessProtected()
    // @Get('pagination/list')
    // async list(
    //     @PaginationQuery(
    //         TAG_DEFAULT_PER_PAGE,
    //         TAG_DEFAULT_ORDER_BY,
    //         TAG_DEFAULT_ORDER_DIRECTION,
    //         TAG_DEFAULT_AVAILABLE_SEARCH,
    //         TAG_DEFAULT_AVAILABLE_ORDER_BY
    //     )
    //         { _search, _limit, _offset, _order }: PaginationListDto,
    //     @PaginationQueryFilterEqualObjectId('owner')
    //         owner: Record<string, any>
    // ): Promise<IResponsePaging> {
    //     console.log(_search, owner);
    //     const find: Record<string, any> = {
    //         ..._search,
    //         ...owner,
    //     };
    //
    //     const tags: ITagEntity[] = await this.tagService.findAll(find, {
    //         paging: {
    //             limit: _limit,
    //             offset: _offset,
    //         },
    //         order: _order,
    //     });
    //     const total: number = await this.tagService.getTotal(find);
    //     const totalPage: number = this.paginationService.totalPage(
    //         total,
    //         _limit
    //     );
    //
    //     return {
    //         _pagination: { total, totalPage },
    //         data: tags,
    //     };
    // }

    // @TagAdminListDoc()
    // @ResponsePaging('tag.list', {
    //     serialization: TagListSerialization,
    // })
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.USER,
    //     action: [ENUM_POLICY_ACTION.READ],
    // })
    // @AuthJwtAdminAccessProtected()
    // @Get('/list')
    // async list(
    //     @PaginationQuery(
    //         TAG_DEFAULT_PER_PAGE,
    //         TAG_DEFAULT_ORDER_BY,
    //         TAG_DEFAULT_ORDER_DIRECTION,
    //         TAG_DEFAULT_AVAILABLE_SEARCH,
    //         TAG_DEFAULT_AVAILABLE_ORDER_BY
    //     )
    //     { _search, _limit, _offset, _order }: PaginationListDto,
    //     @PaginationQueryFilterInBoolean('isActive', USER_DEFAULT_IS_ACTIVE)
    //     isActive: Record<string, any>,
    //     @PaginationQueryFilterInBoolean('blocked', USER_DEFAULT_BLOCKED)
    //     blocked: Record<string, any>,
    //     @PaginationQueryFilterInBoolean(
    //         'inactivePermanent',
    //         USER_DEFAULT_INACTIVE_PERMANENT
    //     )
    //     inactivePermanent: Record<string, any>,
    //     @PaginationQueryFilterEqualObjectId('role')
    //     role: Record<string, any>
    // ): Promise<IResponsePaging> {
    //     const find: Record<string, any> = {
    //         ..._search,
    //         ...isActive,
    //         ...blocked,
    //         ...inactivePermanent,
    //         ...role,
    //     };
    //
    //     const users: IUserEntity[] = await this.userService.findAll(find, {
    //         paging: {
    //             limit: _limit,
    //             offset: _offset,
    //         },
    //         order: _order,
    //     });
    //     const total: number = await this.userService.getTotal(find);
    //     const totalPage: number = this.paginationService.totalPage(
    //         total,
    //         _limit
    //     );
    //
    //     return {
    //         _pagination: { total, totalPage },
    //         data: users,
    //     };
    // }
    //
    // @TagAdminGetDoc()
    // @Response('tag.get', {
    //     serialization: TagGetSerialization,
    // })
    // @TagAdminGetGuard()
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.USER,
    //     action: [ENUM_POLICY_ACTION.READ],
    // })
    // @AuthJwtAdminAccessProtected()
    // @RequestParamGuard(TagRequestDto)
    // @Get('/get/:tag')
    // async get(@GetTag() tag: TagDoc): Promise<IResponse> {
    //     // TODO ?
    //     return { data: tag };
    // }
    //
    // @UserAdminCreateDoc()
    // @Response('tag.create', {
    //     serialization: ResponseIdSerialization,
    // })
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.USER,
    //     action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.CREATE],
    // })
    // @AuthJwtAdminAccessProtected()
    // @Post('/create')
    // async create(
    //     @Body()
    //     { name, description, owner }: TagCreateDto
    // ): Promise<IResponse> {
    //     const user: Promise<any> = this.userService.findOneById(owner);
    //
    //     if (!user) {
    //         throw new NotFoundException({
    //             statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
    //             message: 'user.error.notFound',
    //         });
    //     }
    //
    //     const created: TagDoc = await this.tagService.create({
    //         name,
    //         description,
    //         owner,
    //     });
    //
    //     return {
    //         data: { _id: created._id },
    //     };
    // }
    //
    // @UserAdminUpdateDoc()
    // @Response('tag.update', {
    //     serialization: ResponseIdSerialization,
    // })
    // @UserAdminUpdateGuard()
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.USER,
    //     action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    // })
    // @AuthJwtAdminAccessProtected()
    // @RequestParamGuard(TagRequestDto)
    // @Put('/update/:tag')
    // async update(
    //     @GetTag() tag: TagDoc,
    //     @Body()
    //     body: TagUpdateDto
    // ): Promise<IResponse> {
    //     await this.tagService.update(tag, body);
    //
    //     return {
    //         data: { _id: tag._id },
    //     };
    // }
    //
    // @UserAdminDeleteDoc()
    // @Response('tag.delete')
    // @UserAdminDeleteGuard()
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.USER,
    //     action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.DELETE],
    // })
    // @AuthJwtAdminAccessProtected()
    // @RequestParamGuard(TagRequestDto)
    // @Delete('/delete/:tag')
    // async delete(@GetTag() tag: TagDoc): Promise<void> {
    //     await this.tagService.delete(tag);
    //
    //     return;
    // }
    //
    // @UserAdminImportDoc()
    // @Response('tag.import')
    // @UploadFileSingle('file')
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.USER,
    //     action: [
    //         ENUM_POLICY_ACTION.READ,
    //         ENUM_POLICY_ACTION.CREATE,
    //         ENUM_POLICY_ACTION.IMPORT,
    //     ],
    // })
    // @AuthJwtAdminAccessProtected()
    // @Post('/import')
    // async import(
    //     @UploadedFile(
    //         FileRequiredPipe,
    //         FileSizeExcelPipe,
    //         FileTypeExcelPipe,
    //         FileExtractPipe,
    //         new FileValidationPipe<TagImportDto>(TagImportDto)
    //     )
    //     file: IFileExtract<TagImportDto>
    // ): Promise<void> {
    //     await this.tagService.import(file.dto);
    //
    //     return;
    // }
    //
    // @UserAdminExportDoc()
    // @ResponseFile({
    //     serialization: TagListSerialization,
    //     fileType: ENUM_HELPER_FILE_TYPE.CSV,
    // })
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.USER,
    //     action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.EXPORT],
    // })
    // @AuthJwtAdminAccessProtected()
    // @HttpCode(HttpStatus.OK)
    // @Post('/export')
    // async export(): Promise<IResponse> {
    //     const tags: ITagEntity[] = await this.tagService.findAll({});
    //
    //     return { data: tags };
    // }
}
