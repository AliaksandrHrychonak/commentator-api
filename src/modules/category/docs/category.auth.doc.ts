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
import { CategoryListSerialization } from '../serializations/category.list.serialization';

export function CategoryAuthUserCreateDoc(): MethodDecorator {
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
export function CategoryAuthUserListDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.auth.tag',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponsePaging<CategoryListSerialization>('tag.list', {
            serialization: CategoryListSerialization,
        })
    );
}

export function CategoryAuthUserUpdateDoc(): MethodDecorator {
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

export function CategoryAuthUserDeleteDoc(): MethodDecorator {
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
