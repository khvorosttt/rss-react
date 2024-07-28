import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AnimalResponse, RequestBody, ResponseBody } from '../types';

export const animalsApi = createApi({
    reducerPath: 'animalsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v1/rest' }),
    endpoints: (builder) => ({
        getAnimalsByName: builder.query<ResponseBody, RequestBody>({
            query: (request: RequestBody) => ({
                url: `/animal/search/?pageNumber=${request.pageNumber}&pageSize=9`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `name=${request.name}`,
            }),
        }),
        getAnimalById: builder.query<AnimalResponse, string>({
            query: (detailId: string) => `/animal?uid=${detailId}`,
        }),
    }),
});

export const { useGetAnimalsByNameQuery, useLazyGetAnimalsByNameQuery, useGetAnimalByIdQuery } = animalsApi;
