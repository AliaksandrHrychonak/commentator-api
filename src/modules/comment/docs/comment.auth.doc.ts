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
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import { CommentListSerialization } from 'src/modules/comment/serializations/comment.list.serialization';
import {UserDocParamsId} from "src/modules/user/constants/user.doc.constant";
import {CommentGetSerialization} from "src/modules/comment/serializations/comment.get.serialization";

export function CommentAuthUserCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.auth.comment',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocGuard({ role: true, policy: true }),
        DocResponse<ResponseIdSerialization>('comment.create', {
            httpStatus: HttpStatus.CREATED,
            serialization: ResponseIdSerialization,
        })
    );
}
export function CommentAuthUserListDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.auth.comment',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponsePaging<CommentListSerialization>('comment.list', {
            serialization: CommentListSerialization,
        })
    );
}

export function CommentAuthUserGetDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.auth.comment',
        }),
        DocRequest({
            params: UserDocParamsId,
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponse<CommentGetSerialization>('comment.get', {
            serialization: CommentGetSerialization,
        })
    );
}

export function CommentAuthUserUpdateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.auth.comment',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocResponse<ResponseIdSerialization>('comment.update', {
            serialization: ResponseIdSerialization,
        })
    );
}

export function CommentAuthUserDeleteDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            operation: 'modules.auth.comment',
        }),
        DocAuth({
            jwtAccessToken: true,
        }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocResponse('comment.delete')
    );
}
