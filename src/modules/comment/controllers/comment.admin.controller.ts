import {ApiTags} from "@nestjs/swagger";
import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UploadedFile
} from "@nestjs/common";
import {Response, ResponseFile} from "src/common/response/decorators/response.decorator";
import {PolicyAbilityProtected} from "src/common/policy/decorators/policy.decorator";
import {ENUM_POLICY_ACTION, ENUM_POLICY_SUBJECT} from "src/common/policy/constants/policy.enum.constant";
import {AuthJwtAdminAccessProtected} from "src/common/auth/decorators/auth.jwt.decorator";
import {IResponse} from "src/common/response/interfaces/response.interface";
import {UploadFileSingle} from "src/common/file/decorators/file.decorator";
import {FileRequiredPipe} from "src/common/file/pipes/file.required.pipe";
import {FileSizeExcelPipe} from "src/common/file/pipes/file.size.pipe";
import {FileTypeExcelPipe} from "src/common/file/pipes/file.type.pipe";
import {FileExtractPipe} from "src/common/file/pipes/file.extract.pipe";
import {FileValidationPipe} from "src/common/file/pipes/file.validation.pipe";
import {IFileExtract} from "src/common/file/interfaces/file.interface";
import {ENUM_HELPER_FILE_TYPE} from "src/common/helper/constants/helper.enum.constant";
import {CommentImportDto} from "src/modules/comment/dtos/comment.import.dto";
import {CommentService} from "src/modules/comment/services/comment.service";
import {ICommentEntity} from "src/modules/comment/interfaces/comment.interface";
import {CommentListExportSerialization} from "src/modules/comment/serializations/comment.list-export.serialization";
import {CommentAdminExportDoc, CommentAdminImportDoc} from "src/modules/comment/docs/comment.admin.doc";

@ApiTags('modules.admin.comment')
@Controller({
    version: '1',
    path: '/comment',
})
export class CommentAdminController {
    constructor(
        private readonly commentService: CommentService
    ) {}

    @CommentAdminImportDoc()
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

    @CommentAdminExportDoc()
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
        return { data: comments };
    }
}