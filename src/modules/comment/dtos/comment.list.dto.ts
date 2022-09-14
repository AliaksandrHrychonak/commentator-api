import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PaginationListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import {
    PaginationAvailableSearch,
    PaginationAvailableSort,
    PaginationFilterId,
    PaginationFilterString,
    PaginationPage,
    PaginationPerPage,
    PaginationSearch,
    PaginationSearchMongoId,
    PaginationSort,
} from 'src/common/pagination/decorators/pagination.decorator';
import { IPaginationSort } from 'src/common/pagination/pagination.interface';
import {
    COMMENT_DEFAULT_AVAILABLE_SEARCH,
    COMMENT_DEFAULT_AVAILABLE_SEARCH_MONGO_ID,
    COMMENT_DEFAULT_AVAILABLE_SORT,
    COMMENT_DEFAULT_PAGE,
    COMMENT_DEFAULT_PER_PAGE,
    COMMENT_DEFAULT_SORT,
} from '../constants/comment.list.constant';

export class CommentListDto implements PaginationListAbstract {
    @PaginationSearch(COMMENT_DEFAULT_AVAILABLE_SEARCH)
    readonly search: Record<string, any>;

    @PaginationAvailableSearch(COMMENT_DEFAULT_AVAILABLE_SEARCH)
    readonly availableSearch: string[];

    @PaginationPage(COMMENT_DEFAULT_PAGE)
    readonly page: number;

    @PaginationPerPage(COMMENT_DEFAULT_PER_PAGE)
    readonly perPage: number;

    @PaginationSort(COMMENT_DEFAULT_SORT, COMMENT_DEFAULT_AVAILABLE_SORT)
    readonly sort: IPaginationSort;

    @PaginationAvailableSort(COMMENT_DEFAULT_AVAILABLE_SORT)
    readonly availableSort: string[];

    @PaginationSearchMongoId(COMMENT_DEFAULT_AVAILABLE_SEARCH_MONGO_ID)
    readonly tags: Record<string, any>;
}