export interface AnimalBody {
    uid: string;
    name: string;
    earthAnimal: boolean;
    earthInsect: boolean;
    avian: boolean;
    canine: boolean;
    feline: boolean;
}

interface PageInfo {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}

interface ClausesInfo {
    name: string;
    direction: 'ASC' | 'DESC';
    clauseOrder: number;
}

export interface ResponseBody {
    page: PageInfo;
    sort: ClausesInfo;
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

export default class Api {
    static async fetchData(animalName: string) {
        return fetch(`https://stapi.co/api/v1/rest/animal/search`, POSTOptions(animalName)).then((response) =>
            response.json()
        );
    }
}
