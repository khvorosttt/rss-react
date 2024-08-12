import { PageInfo } from '../services/types';

export enum SearchParams {
    detailId = 'detailId',
}

export const getFieldStatus = (isAssigned: boolean) => (isAssigned ? 'yes' : 'no');

export const initPageInfo: PageInfo = {
    pageNumber: 0,
    pageSize: 1,
    numberOfElements: 0,
    totalElements: 0,
    totalPages: 1,
    firstPage: true,
    lastPage: true,
};
