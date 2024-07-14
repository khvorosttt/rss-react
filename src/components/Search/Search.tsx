import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SearchSection from '../SearchSection/SearchSection';
import ResultSection from '../ResultSection/ResultSection';
import ErrorBounder from '../ErrorBounder/ErrorBounder';
import useSearchQueryRestore from '../../utils/hooks/useSearchQueryRestore';
import Pagination from '../Pagination/Pagination';
import './search.css';

export default function Search() {
    const { inputValue, setSearchValues, handleChangeInput, searchResult, isLoading, pageInfo, setCurrentPage } =
        useSearchQueryRestore();
    const [searchParams] = useSearchParams();
    const detailId = searchParams.get('detail');
    const navigate = useNavigate();

    const handleClickSearchButton = () => {
        setSearchValues();
        navigate(`/page/0`);
    };

    return (
        <ErrorBounder>
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
        </ErrorBounder>
    );
}
