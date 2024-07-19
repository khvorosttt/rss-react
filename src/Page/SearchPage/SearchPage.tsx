import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SearchSection from '../../components/SearchSection/SearchSection';
import ResultSection from '../../components/ResultSection/ResultSection';
import useSearchQueryRestore from '../../utils/hooks/useSearchQueryRestore';
import Pagination from '../../components/Pagination/Pagination';
import './searchPage.css';
import { SearchParams } from '../../utils/hooks/constants';

export default function SearchPage() {
    const { inputValue, setSearchValues, handleChangeInput, searchResult, isLoading, pageInfo, setCurrentPage } =
        useSearchQueryRestore();
    const [searchParams] = useSearchParams();
    const detailId = searchParams.get(SearchParams.detail);
    const navigate = useNavigate();

    const handleClickSearchButton = () => {
        setSearchValues();
        navigate(`/page/0`);
    };

    return (
        <div className="search-container">
            <SearchSection
                searchQuery={inputValue}
                inputChange={handleChangeInput}
                searchButton={handleClickSearchButton}
            />
            <div className="result-container">
                <ResultSection result={searchResult} isLoading={isLoading} />
                <div id="detail">{detailId && <Outlet />}</div>
            </div>
            <Pagination setPageNumber={setCurrentPage} pageInfo={pageInfo} />
        </div>
    );
}
