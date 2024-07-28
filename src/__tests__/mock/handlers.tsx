import { http, HttpResponse } from 'msw';
import { testAnimals, testPageInfo } from '../data';

const handlers = [
    http.post(`https://stapi.co/api/v1/rest/animal/search/?pageNumber=1&pageSize=9`, async () => {
        return HttpResponse.json({
            page: testPageInfo,
            animals: testAnimals.slice(0, 9),
        });
    }),
    http.get(`https://stapi.co/api/v1/rest/animal`, ({ request }) => {
        const url = new URL(request.url);
        const detailId = url.searchParams.get('uid');
        if (detailId === 'a') {
            return new HttpResponse(null, { status: 404 });
        }
        return HttpResponse.json(testAnimals[0]);
    }),
];

export default handlers;
