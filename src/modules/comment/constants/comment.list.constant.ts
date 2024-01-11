import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from 'src/common/pagination/constants/pagination.enum.constant';

export const COMMENT_DEFAULT_PER_PAGE = 20;
export const COMMENT_DEFAULT_ORDER_BY = 'createdAt';
export const COMMENT_DEFAULT_ORDER_DIRECTION =
    ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC;
export const COMMENT_DEFAULT_AVAILABLE_ORDER_BY = ['value', 'createdAt'];
export const COMMENT_DEFAULT_AVAILABLE_SEARCH = ['value', 'owner'];

export const COMMENT_AUTH_USER_AVAILABLE_ORDER_BY = ['value'];
export const COMMENT_AUTH_USER_AVAILABLE_SEARCH = ['value'];
