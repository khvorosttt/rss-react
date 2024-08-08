'use client';

import { useDispatch } from 'react-redux';
import { AnimalResponse, ResponseBody } from '../services/types';
import { updateAnimals, updateCurrentCardDetail, updateSearchQuery } from '../services/features/animalsSlice';
import SearchSection from '../components/SearchSection/SearchSection';
import ResultSection from '../components/ResultSection/ResultSection';
import CardDetail from '../components/CardDetail/CardDetail';
import Pagination from '../components/Pagination/Pagination';
import SelectedPanel from '../components/SelectedPanel/SelectedPanel';
import { useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import useLoader from '../utils/hooks/useLoader';

export interface PageDataInfo {
    data: ResponseBody;
    searchQuery: string;
    detail?: AnimalResponse;
}

export interface SearchPageProps {
    info: PageDataInfo;
}

export default function SearchPage({ info }: SearchPageProps) {
    const dispatch = useDispatch();
    const resultLoading = useLoader();

    useEffect(() => {
        dispatch(updateAnimals(info.data));
        dispatch(updateSearchQuery(info.searchQuery));
        if (info.detail) {
            dispatch(updateCurrentCardDetail(info.detail.animal));
        }
    }, [dispatch, info.data, info.searchQuery, info.detail]);

    return (
        <div className="search-container">
            <SearchSection />
            <div className="result-container">
                {resultLoading ? <Loader /> : <ResultSection />}
                <div id="detail">{info.detail ? <CardDetail /> : null}</div>
            </div>
            <Pagination />
            <SelectedPanel />
        </div>
    );
}
