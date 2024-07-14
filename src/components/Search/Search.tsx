import { useState } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import SearchSection from '../SearchSection/SearchSection';
import ResultSection from '../ResultSection/ResultSection';
import ErrorBounder from '../ErrorBounder/ErrorBounder';
import useSearchQueryRestore from '../../utils/hooks/useSearchQueryRestore';
import Pagination from '../Pagination/Pagination';

export default function Search() {
    const { inputValue, setSearchValues, handleChangeInput, searchResult, isLoading, pageInfo } =
        useSearchQueryRestore();
    const [searchParams] = useSearchParams();
    const detailId = searchParams.get('detail');
    const { pageId } = useParams<{ pageId: string }>();
    const [currentPage, setCurrentPage] = useState(pageId);

    const handleClickSearchButton = () => {
        setSearchValues();
    };

    return (
        <ErrorBounder>
            <SearchSection
                searchQuery={inputValue}
                inputChange={handleChangeInput}
                searchButton={handleClickSearchButton}
            />
            <ResultSection result={searchResult} isLoading={isLoading} />
            <div id="detail">{detailId && <Outlet />}</div>
            <Pagination pageNumber={currentPage} setPageNumber={setCurrentPage} pageInfo={pageInfo} />
        </ErrorBounder>
    );
}
