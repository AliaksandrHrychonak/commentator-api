import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant';
import {
    Doc,
    DocAuth,
    DocRequest,
    DocGuard,
    DocResponse,
    DocResponsePaging,
    DocRequestFile,
    DocResponseFile,
} from 'src/common/doc/decorators/doc.decorator';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import {
    UserDocParamsId,
    UserDocQueryBlocked,
    UserDocQueryInactivePermanent,
    UserDocQueryIsActive,
    UserDocQueryRole,
} from 'src/modules/user/constants/user.doc.constant';
import { TagListSerialization } from '../serializations/tag.list.serialization';
import { TagGetSerialization } from '../serializations/tag.get.serialization';
import { TagDocParamsId } from '../constants/tag.doc.constant';

export function TagAdminListDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.tag',
        }),
        DocRequest({
            queries: [
                ...UserDocQueryIsActive,
                ...UserDocQueryBlocked,
                ...UserDocQueryInactivePermanent,
                ...UserDocQueryRole,
            ],
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponsePaging<TagListSerialization>('tag.list', {
            serialization: TagListSerialization,
        })
    );
}

export function TagAdminGetDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.tag',
        }),
        DocRequest({
            params: UserDocParamsId,
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponse<TagGetSerialization>('tag.get', {
            serialization: TagGetSerialization,
        })
    );
}

export function TagAdminCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.tag',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocGuard({ role: true, policy: true }),
        DocResponse<ResponseIdSerialization>('tag.create', {
            httpStatus: HttpStatus.CREATED,
            serialization: ResponseIdSerialization,
        })
    );
}

export function TagAdminUpdateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.tag',
        }),
        DocRequest({
            params: TagDocParamsId,
            bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponse<ResponseIdSerialization>('tag.update', {
            serialization: ResponseIdSerialization,
        })
    );
}

export function TagAdminDeleteDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.tag',
        }),
        DocRequest({
            params: TagDocParamsId,
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponse('tag.delete')
    );
}

export function TagAdminImportDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.tag',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocRequestFile(),
        DocGuard({ role: true, policy: true }),
        DocResponse('tag.import', {
            httpStatus: HttpStatus.CREATED,
        })
    );
}

export function TagAdminExportDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.tag',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponseFile()
    );
}
