import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SearchSection from '../../components/SearchSection/SearchSection';
import ResultSection from '../../components/ResultSection/ResultSection';
import './searchPage.css';
import { SearchParams } from '../../utils/hooks/constants';
import useSearchQueryRestore from '../../utils/hooks/useSearchQueryRestore';

export default function SearchPage() {
    const { inputValue, setSearchValues, handleChangeInput } = useSearchQueryRestore();
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
                <ResultSection />
                <div id="detail">{detailId && <Outlet />}</div>
            </div>
            {/* <Pagination setPageNumber={() => {}} pageInfo={} /> */}
        </div>
    );
}
