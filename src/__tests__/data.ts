import { AnimalBody, PageInfo, ResponseBody } from '../services/api/Api';

export const testPageInfo: PageInfo = {
    pageNumber: 1,
    pageSize: 9,
    numberOfElements: 3,
    totalElements: 3,
    totalPages: 1,
    firstPage: true,
    lastPage: true,
};

export const testAnimals: AnimalBody[] = [
    {
        uid: '1',
        name: 'Test animal',
        earthAnimal: true,
        earthInsect: false,
        avian: true,
        canine: false,
        feline: true,
    },
    {
        uid: '2',
        name: 'Test animal 2',
        earthAnimal: false,
        earthInsect: true,
        avian: false,
        canine: true,
        feline: false,
    },
    {
        uid: '3',
        name: 'Test animal 3',
        earthAnimal: true,
        earthInsect: false,
        avian: true,
        canine: false,
        feline: true,
    },
];

export const testResponseBody: ResponseBody = {
    page: testPageInfo,
    sort: {
        clauses: [],
    },
    animals: testAnimals,
};

export const padeId = 1;

export const mockNavigate = vi.fn();
