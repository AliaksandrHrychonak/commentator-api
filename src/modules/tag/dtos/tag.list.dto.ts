import { PaginationListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import {
    PaginationAvailableSearch,
    PaginationAvailableSort,
    PaginationPage,
    PaginationPerPage,
    PaginationSearch,
    PaginationSort,
} from 'src/common/pagination/decorators/pagination.decorator';
import { IPaginationSort } from 'src/common/pagination/pagination.interface';
import {
    TAG_DEFAULT_AVAILABLE_SEARCH,
    TAG_DEFAULT_AVAILABLE_SORT,
    TAG_DEFAULT_PAGE,
    TAG_DEFAULT_PER_PAGE,
    TAG_DEFAULT_SORT,
} from '../constants/tag.list.constant';

export class TagListDto implements PaginationListAbstract {
    @PaginationSearch(TAG_DEFAULT_AVAILABLE_SEARCH)
    readonly search: Record<string, any>;

    @PaginationAvailableSearch(TAG_DEFAULT_AVAILABLE_SEARCH)
    readonly availableSearch: string[];

    @PaginationPage(TAG_DEFAULT_PAGE)
    readonly page: number;

    @PaginationPerPage(TAG_DEFAULT_PER_PAGE)
    readonly perPage: number;

    @PaginationSort(TAG_DEFAULT_SORT, TAG_DEFAULT_AVAILABLE_SORT)
    readonly sort: IPaginationSort;

    @PaginationAvailableSort(TAG_DEFAULT_AVAILABLE_SORT)
    readonly availableSort: string[];

}
