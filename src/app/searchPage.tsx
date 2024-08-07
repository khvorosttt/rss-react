'use client';

import { useDispatch } from 'react-redux';
import { AnimalBody, ResponseBody } from '../services/types';
import { updateAnimals, updateCurrentCardDetail, updateSearchQuery } from '../services/features/animalsSlice';
import SearchSection from '../components/SearchSection/SearchSection';
import ResultSection from '../components/ResultSection/ResultSection';
import CardDetail from '../components/CardDetail/CardDetail';
import Pagination from '../components/Pagination/Pagination';
import SelectedPanel from '../components/SelectedPanel/SelectedPanel';

export interface PageDataInfo {
    data: ResponseBody;
    searchQuery: string;
    detail?: AnimalBody;
}

export interface SearchPageProps {
    info: PageDataInfo;
}

export default function SearchPage({ info }: SearchPageProps) {
    const dispatch = useDispatch();
    dispatch(updateAnimals(info.data));
    dispatch(updateSearchQuery(info.searchQuery));
    if (info.detail) {
        dispatch(updateCurrentCardDetail(info.detail));
    }

    return (
        <div className="search-container">
            <SearchSection />
            <div className="result-container">
                <ResultSection />
                <div id="detail">{info.detail ? <CardDetail /> : null}</div>
            </div>
            <Pagination />
            <SelectedPanel />
        </div>
    );
}
