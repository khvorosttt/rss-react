export interface AnimalBody {
    uid: string;
    name: string;
    earthAnimal: boolean;
    earthInsect: boolean;
    avian: boolean;
    canine: boolean;
    feline: boolean;
}

export interface AnimalResponse {
    animal: AnimalBody;
}

export interface PageInfo {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}

interface SortInfo {
    clauses: ClausesInfo[];
}

interface ClausesInfo {
    name: string;
    direction: 'ASC' | 'DESC';
    clauseOrder: number;
}

export interface ResponseBody {
    page: PageInfo;
    animals: AnimalBody[];
    sort?: SortInfo;
}

export interface RequestBody {
    name: string;
    pageNumber: number;
}
