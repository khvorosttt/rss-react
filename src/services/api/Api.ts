import { LoaderFunction, LoaderFunctionArgs } from 'react-router';

export interface AnimalBody {
    uid: string;
    name: string;
    earthAnimal: boolean;
    earthInsect: boolean;
    avian: boolean;
    canine: boolean;
    feline: boolean;
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
    sort: SortInfo;
    animals: AnimalBody[];
}

const POSTOptions = (request: string) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${request}`,
    };
};

export async function fetchData(animalName: string, pageNumber: number = 0) {
    try {
        const response = await fetch(
            `https://stapi.co/api/v1/rest/animal/search?pageNumber=${pageNumber}&pageSize=9`,
            POSTOptions(animalName)
        );
        const data = await response.json();
        return data;
    } catch {
        throw new Error('Fetch failed');
    }
}

export const getAnimal: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const detailId = url.searchParams.get('detail');
    try {
        if (detailId) {
            const data = await fetch(`https://stapi.co/api/v1/rest/animal?uid=${detailId}`).then((response) =>
                response.json()
            );
            return data;
        }
        return null;
    } catch (error) {
        throw new Error('Fetch failed');
    }
};
