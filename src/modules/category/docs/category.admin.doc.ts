import {
    Doc,
    DocAuth,
    DocGuard,
    DocRequest,
    DocRequestFile,
    DocResponse,
    DocResponseFile,
    DocResponsePaging,
} from '../../../common/doc/decorators/doc.decorator';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { CategoryListSerialization } from '../serializations/category.list.serialization';
import { UserDocParamsId } from '../../user/constants/user.doc.constant';
import { CategoryGetSerialization } from '../serializations/category.get.serialization';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../../../common/doc/constants/doc.enum.constant';
import { ResponseIdSerialization } from '../../../common/response/serializations/response.id.serialization';
import { CategoryDocParamsId } from '../constants/category.doc.constant';

export function CategoryAdminListDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.category',
        }),
        // DocRequest({
        //     queries: [
        //         ...UserDocQueryIsActive,
        //         ...UserDocQueryBlocked,
        //         ...UserDocQueryInactivePermanent,
        //         ...UserDocQueryRole,
        //     ],
        // }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponsePaging<CategoryListSerialization>('category.list', {
            serialization: CategoryListSerialization,
        })
    );
}

export function CategoryAdminGetDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.category',
        }),
        DocRequest({
            params: UserDocParamsId,
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponse<CategoryGetSerialization>('category.get', {
            serialization: CategoryGetSerialization,
        })
    );
}

export function CategoryAdminCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.category',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocRequest({
            params: UserDocParamsId,
            bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponse<ResponseIdSerialization>('category.create', {
            httpStatus: HttpStatus.CREATED,
            serialization: ResponseIdSerialization,
        })
    );
}

export function CategoryAdminUpdateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.category',
        }),
        DocRequest({
            params: CategoryDocParamsId,
            bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponse<ResponseIdSerialization>('category.update', {
            serialization: ResponseIdSerialization,
        })
    );
}

export function CategoryAdminDeleteDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.category',
        }),
        DocRequest({
            params: CategoryDocParamsId,
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponse('category.delete')
    );
}

export function CategoryAdminImportDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.category',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocRequestFile(),
        DocGuard({ role: true, policy: true }),
        DocResponse('category.import', {
            httpStatus: HttpStatus.CREATED,
        })
    );
}

export function CategoryAdminExportDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.admin.category',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponseFile()
    );
}
