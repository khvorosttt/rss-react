'use client';

import SearchSection from '../components/SearchSection/SearchSection';
import Pagination from '../components/Pagination/Pagination';
import SelectedPanel from '../components/SelectedPanel/SelectedPanel';
import { AnimalResponse, ResponseBody } from '../services/types';
import ResultSection from '../components/ResultSection/ResultSection';
import CardDetail, { CardDetailProps } from '../components/CardDetail/CardDetail';

export interface PageDataInfo {
    data: ResponseBody;
    searchQuery: string;
    detail?: AnimalResponse;
}

export default function SearchPage({ info }: { info: PageDataInfo }) {
    const cardInfo: CardDetailProps = {
        searchQuery: info.searchQuery,
        currentCardDetail: info.detail?.animal,
    };
    return (
        <div className="search-container">
            <SearchSection searchQuery={info.searchQuery} />
            <div className="result-container">
                <ResultSection info={info.data} />
                <div id="detail">{info.detail ? <CardDetail cardInfo={cardInfo} /> : null}</div>
            </div>
            <Pagination pageInfo={info.data.page} />
            <SelectedPanel />
        </div>
    );
}
