import { useLoaderData } from '@remix-run/react';
import SearchSection from '../../src/components/SearchSection/SearchSection';
import { getAnimal, getAnimalsByName } from '../../src/services/api/animalsApi';
import { AnimalResponse, ResponseBody } from '../../src/services/types';
import ResultSection from '../../src/components/ResultSection/ResultSection';
import Pagination from '../../src/components/Pagination/Pagination';
import '../../src/styles/searchPage.css';
import CardDetail from '../../src/components/CardDetail/CardDetail';
import SelectedPanel from '../../src/components/SelectedPanel/SelectedPanel';

interface LoaderResponse {
    data: ResponseBody;
    detail?: AnimalResponse;
}

export async function loader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('searchQuery') || '';
    const page = url.searchParams.get('page') || '0';
    const detail = url.searchParams.get('detail');
    const data: ResponseBody = await getAnimalsByName(searchQuery, Number(page));
    if (detail) {
        const detailInfo: AnimalResponse = await getAnimal(detail);
        return {
            data,
            detail: detailInfo,
        };
    }
    return {
        data,
    };
}

export default function SearchPage() {
    const info: LoaderResponse = useLoaderData();
    return (
        <div className="search-container">
            <SearchSection />
            <div className="result-container">
                <ResultSection info={info.data} />
                <div id="detail">{info.detail ? <CardDetail cardInfo={info.detail} /> : null}</div>
            </div>
            <Pagination pageInfo={info.data.page} />
            <SelectedPanel />
        </div>
    );
}
