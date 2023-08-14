import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from 'src/common/pagination/constants/pagination.enum.constant';

export const TAG_DEFAULT_PER_PAGE = 20;
export const TAG_DEFAULT_ORDER_BY = 'createdAt';
export const TAG_DEFAULT_ORDER_DIRECTION =
    ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC;
export const TAG_DEFAULT_AVAILABLE_ORDER_BY = ['name', 'description', 'owner'];
export const TAG_DEFAULT_AVAILABLE_SEARCH = ['name', 'description', 'owner'];

export const TAG_AUTH_USER_AVAILABLE_ORDER_BY = ['name', 'description'];
export const TAG_AUTH_USER_AVAILABLE_SEARCH = ['name', 'description'];
