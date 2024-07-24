import { Outlet, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchSection from '../../components/SearchSection/SearchSection';
import ResultSection from '../../components/ResultSection/ResultSection';
import './searchPage.css';
import { SearchParams } from '../../utils/hooks/constants';
import Pagination from '../../components/Pagination/Pagination';
import SelectedPanel from '../../components/SelectedPanel/SelectedPanel';
import { AnimalBody } from '../../services/types';
import { RootState } from '../../app/store';

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const detailId = searchParams.get(SearchParams.detail);
    const selectedAnimals: AnimalBody[] = useSelector((state: RootState) => state.animals.selectedAnimals);

    return (
        <div className="search-container">
            <SearchSection />
            <div className="result-container">
                <ResultSection />
                <div id="detail">{detailId && <Outlet />}</div>
            </div>
            <Pagination />
            {selectedAnimals.length !== 0 && <SelectedPanel selectedAnimals={selectedAnimals} />}
        </div>
    );
}
