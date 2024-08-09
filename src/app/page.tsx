import { Suspense } from 'react';
import ResultSection from '../components/ResultSection/ResultSection';
// import { getAnimal, getAnimalsByName } from '../services/api/animalsApi';
// import { AnimalResponse, ResponseBody } from '../services/types';
import SearchPage, { PageDataInfo } from './searchPage';
// import Loader from '../components/Loader/Loader';
import Loading from './loading';

export default async function Page({
    searchParams,
}: {
    searchParams: { searchQuery: string; page: number; detailId?: number };
}) {
    const searchQuery = searchParams.searchQuery || '';
    const { page } = searchParams;
    // const data: ResponseBody = await getAnimalsByName(searchQuery, page);
    const info: PageDataInfo = { searchQuery };
    // if (detailId) {
    //     const detail: AnimalResponse = await getAnimal(detailId);
    //     info = {
    //         data,
    //         searchQuery,
    //         detail,
    //     };
    // } else {
    //     info = {
    //         data,
    //         searchQuery,
    //     };
    // }
    return (
        <SearchPage info={info}>
            <Suspense fallback={<Loading />}>
                <ResultSection
                    searchParams={{
                        searchQuery,
                        page,
                    }}
                />
            </Suspense>
        </SearchPage>
    );
}
