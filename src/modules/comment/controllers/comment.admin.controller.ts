import {ApiTags} from "@nestjs/swagger";
import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UploadedFile
} from "@nestjs/common";
import {AuthService} from "../../../common/auth/services/auth.service";
import {PaginationService} from "../../../common/pagination/services/pagination.service";
import {Response, ResponseFile} from "../../../common/response/decorators/response.decorator";
import {PolicyAbilityProtected} from "../../../common/policy/decorators/policy.decorator";
import {ENUM_POLICY_ACTION, ENUM_POLICY_SUBJECT} from "../../../common/policy/constants/policy.enum.constant";
import {AuthJwtAdminAccessProtected} from "../../../common/auth/decorators/auth.jwt.decorator";
import {IResponse} from "../../../common/response/interfaces/response.interface";
import {UploadFileSingle} from "../../../common/file/decorators/file.decorator";
import {FileRequiredPipe} from "../../../common/file/pipes/file.required.pipe";
import {FileSizeExcelPipe} from "../../../common/file/pipes/file.size.pipe";
import {FileTypeExcelPipe} from "../../../common/file/pipes/file.type.pipe";
import {FileExtractPipe} from "../../../common/file/pipes/file.extract.pipe";
import {FileValidationPipe} from "../../../common/file/pipes/file.validation.pipe";
import {IFileExtract} from "../../../common/file/interfaces/file.interface";
import {ENUM_HELPER_FILE_TYPE} from "../../../common/helper/constants/helper.enum.constant";
import {CommentImportDto} from "../dtos/comment.import.dto";
import {CommentService} from "../services/comment.service";
import {ICommentEntity} from "../interfaces/comment.interface";
import {CommentListExportSerialization} from "../serializations/comment.list-export.serialization";

@ApiTags('modules.admin.comment')
@Controller({
    version: '1',
    path: '/comment',
})
export class CommentAdminController {
    constructor(
        private readonly authService: AuthService,
        private readonly paginationService: PaginationService,
        private readonly commentService: CommentService
    ) {}

    @Response('category.import')
    @UploadFileSingle('file')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.COMMENT,
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
            new FileValidationPipe<CommentImportDto>(CommentImportDto)
        )
            file: IFileExtract<CommentImportDto>
    ): Promise<void> {
        await this.commentService.import(file.dto);

        return;
    }

    @ResponseFile({
        serialization: CommentListExportSerialization,
        fileType: ENUM_HELPER_FILE_TYPE.CSV,
    })
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.COMMENT,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.EXPORT],
    })
    @AuthJwtAdminAccessProtected()
    @HttpCode(HttpStatus.OK)
    @Post('/export')
    async export(): Promise<IResponse> {
        const comments: ICommentEntity[] =
            await this.commentService.findAll({});
        console.log(comments)
        return { data: comments };
    }
}