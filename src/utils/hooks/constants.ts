export enum SearchParams {
    detail = 'detail',
}

export const getFieldStatus = (isAssigned: boolean) => (isAssigned ? 'yes' : 'no');
