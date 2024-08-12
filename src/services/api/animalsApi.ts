import { POSTOptions } from '../types';

export async function getAnimalsByName(animalName: string, pageNumber: number = 0) {
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

export async function getAnimal(detailId: number) {
    try {
        const data = await fetch(`https://stapi.co/api/v1/rest/animal?uid=${detailId}`).then((response) =>
            response.json()
        );
        return data;
    } catch (error) {
        throw new Error('Fetch failed');
    }
}
