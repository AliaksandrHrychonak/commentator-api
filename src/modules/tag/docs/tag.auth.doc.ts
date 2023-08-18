import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant';
import {
    Doc,
    DocAuth,
    DocGuard,
    DocRequest,
    DocResponse,
    DocResponsePaging,
} from 'src/common/doc/decorators/doc.decorator';
import { ResponseIdSerialization } from '../../../common/response/serializations/response.id.serialization';
import { TagListSerialization } from '../serializations/tag.list.serialization';

export function TagAuthUpdateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.auth.tag',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocResponse('tag.update')
    );
}

export function TagAuthUserCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.auth.tag',
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
export function TagAuthUserListDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.auth.tag',
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

export function TagAuthUserUpdateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.auth.tag',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocResponse<ResponseIdSerialization>('tag.update', {
            serialization: ResponseIdSerialization,
        })
    );
}

export function TagAuthUserDeleteDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.auth.tag',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocResponse('tag.delete')
    );
}
