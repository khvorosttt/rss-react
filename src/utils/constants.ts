import { createContext } from 'react';
import { PageInfo } from '../services/types';

export enum SearchParams {
    detail = 'detail',
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

export enum ThemeVariant {
    light = 'light',
    dark = 'dark',
}

export const ThemeContext = createContext<ThemeVariant>(ThemeVariant.light);
