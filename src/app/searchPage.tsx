// 'use client';

// // import { useDispatch } from 'react-redux';
// import { AnimalResponse, ResponseBody } from '../services/types';
// import { updateAnimals, updateCurrentCardDetail, updateSearchQuery } from '../services/features/animalsSlice';
import SearchSection from '../components/SearchSection/SearchSection';
// import ResultSection from '../components/ResultSection/ResultSection';
// import CardDetail from '../components/CardDetail/CardDetail';
import Pagination from '../components/Pagination/Pagination';
import SelectedPanel from '../components/SelectedPanel/SelectedPanel';
import { ReactNode } from 'react';
// import { useEffect } from 'react';

export interface PageDataInfo {
    // data: ResponseBody;
    searchQuery: string;
    // detail?: AnimalResponse;
}

export interface SearchPageProps {
    info: PageDataInfo;
    children: ReactNode;
}

export default function SearchPage({ info, children }: SearchPageProps) {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(updateAnimals(info.data));
    //     dispatch(updateSearchQuery(info.searchQuery));
    //     if (info.detail) {
    //         dispatch(updateCurrentCardDetail(info.detail.animal));
    //     }
    // }, [dispatch, info.data, info.searchQuery, info.detail]);

    return (
        <div className="search-container">
            <SearchSection searchQuery={info.searchQuery} />
            <div className="result-container">
                {children}
                {/* <ResultSection /> */}
                {/* <div id="detail">{info.detail ? <CardDetail /> : null}</div> */}
            </div>
            <Pagination />
            <SelectedPanel />
        </div>
    );
}
