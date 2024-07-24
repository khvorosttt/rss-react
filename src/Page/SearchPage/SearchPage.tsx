import { Outlet, useSearchParams } from 'react-router-dom';
import SearchSection from '../../components/SearchSection/SearchSection';
import ResultSection from '../../components/ResultSection/ResultSection';
import './searchPage.css';
import { SearchParams } from '../../utils/hooks/constants';
import Pagination from '../../components/Pagination/Pagination';

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const detailId = searchParams.get(SearchParams.detail);

    return (
        <div className="search-container">
            <SearchSection />
            <div className="result-container">
                <ResultSection />
                <div id="detail">{detailId && <Outlet />}</div>
            </div>
            <Pagination />
        </div>
    );
}
