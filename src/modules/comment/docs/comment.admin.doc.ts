import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
    Doc,
    DocAuth,
    DocGuard,
    DocResponse,
    DocRequestFile,
    DocResponseFile,
} from 'src/common/doc/decorators/doc.decorator';

// export function CommentAdminListDoc(): MethodDecorator {
//     return applyDecorators(
//         Doc({
//             operation: 'modules.admin.comment',
//         }),
//         DocAuth({
//             jwtAccessToken: true,
//         }),
//         DocGuard({ role: true, policy: true }),
//         DocResponsePaging<CommentListSerialization>('comment.list', {
//             serialization: CommentListSerialization,
//         })
//     );
// }
//
// export function CommentAdminGetDoc(): MethodDecorator {
//     return applyDecorators(
//         Doc({
//             operation: 'modules.admin.comment',
//         }),
//         DocRequest({
//             params: UserDocParamsId,
//         }),
//         DocAuth({
//             jwtAccessToken: true,
//         }),
//         DocGuard({ role: true, policy: true }),
//         DocResponse<CommentGetSerialization>('comment.get', {
//             serialization: CommentGetSerialization,
//         })
//     );
// }
//
// export function CommentAdminCreateDoc(): MethodDecorator {
//     return applyDecorators(
//         Doc({
//             operation: 'modules.admin.comment',
//         }),
//         DocAuth({
//             jwtAccessToken: true,
//         }),
//         DocRequest({
//             params: UserDocParamsId,
//             bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
//         }),
//         DocGuard({ role: true, policy: true }),
//         DocResponse<ResponseIdSerialization>('comment.create', {
//             httpStatus: HttpStatus.CREATED,
//             serialization: ResponseIdSerialization,
//         })
//     );
// }
//
// export function CommentAdminUpdateDoc(): MethodDecorator {
//     return applyDecorators(
//         Doc({
//             operation: 'modules.admin.comment',
//         }),
//         DocRequest({
//             params: CommentDocParamsId,
//             bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
//         }),
//         DocAuth({
//             jwtAccessToken: true,
//         }),
//         DocGuard({ role: true, policy: true }),
//         DocResponse<ResponseIdSerialization>('comment.update', {
//             serialization: ResponseIdSerialization,
//         })
//     );
// }
//
// export function CommentAdminDeleteDoc(): MethodDecorator {
//     return applyDecorators(
//         Doc({
//             operation: 'modules.admin.comment',
//         }),
//         DocRequest({
//             params: CommentDocParamsId,
//         }),
//         DocAuth({
//             jwtAccessToken: true,
//         }),
//         DocGuard({ role: true, policy: true }),
//         DocResponse('comment.delete')
//     );
// }

export function CommentAdminImportDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.comment',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocRequestFile(),
        DocGuard({ role: true, policy: true }),
        DocResponse('comment.import', {
            httpStatus: HttpStatus.CREATED,
        })
    );
}

export function CommentAdminExportDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.comment',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponseFile()
    );
}
