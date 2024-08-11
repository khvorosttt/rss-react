import { getAnimal, getAnimalsByName } from '../services/api/animalsApi';
import { ResponseBody } from '../services/types';
import { testAnimals, testPageInfo } from './data';

describe('test animalsApi', () => {
    const mockFetch = vi.fn();

    beforeEach(() => {
        globalThis.fetch = mockFetch;
    });

    it('should test getAnimalsByName', async () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => ({ animals: testAnimals, page: testPageInfo }),
        });
        const data: ResponseBody = await getAnimalsByName('test', 0);
        expect(mockFetch).toHaveBeenCalledWith(`https://stapi.co/api/v1/rest/animal/search?pageNumber=0&pageSize=9`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=test`,
        });
        expect(data).toEqual({ animals: testAnimals, page: testPageInfo });
    });

    it('should test getAnimal', async () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => testAnimals[0],
        });
        const data: ResponseBody = await getAnimal(0);
        expect(mockFetch).toHaveBeenCalledWith(`https://stapi.co/api/v1/rest/animal?uid=0`);
        expect(data).toEqual(testAnimals[0]);
    });

    it('should return error in getAnimalsByName', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Bad request'));
        expect(getAnimalsByName('test', 0)).rejects.toThrow('Fetch failed');
    });

    it('should return error in getAnimal', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Bad request'));
        expect(getAnimal(0)).rejects.toThrow('Fetch failed');
    });
});
