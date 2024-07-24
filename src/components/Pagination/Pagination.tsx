import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PageInfo } from '../../services/types';
import './pagination.css';
import { RootState } from '../../app/store';
import { useGetAnimalsByNameMutation } from '../../services/api/animalsApi';
import { updateAnimals } from '../../services/features/animalsSlice';

export default function Pagination() {
    const navigate = useNavigate();
    const pageInfo: PageInfo = useSelector((state: RootState) => state.animals.pageInfo);
    const [getAnimalsByName, { data, isLoading }] = useGetAnimalsByNameMutation();
    const searchQuery: string = useSelector((state: RootState) => state.animals.searchQuery);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading && data) {
            dispatch(updateAnimals({ animals: data.animals, page: data.page }));
        }
    }, [data, isLoading, dispatch]);

    const prevClickHandler = () => {
        if (pageInfo && !pageInfo.firstPage) {
            getAnimalsByName({
                name: searchQuery,
                pageNumber: Number(pageInfo.pageNumber) - 1,
            });
            navigate(`/page/${Number(pageInfo.pageNumber) - 1}`);
        }
    };

    const nextClickHandler = () => {
        if (pageInfo && !pageInfo.lastPage) {
            getAnimalsByName({
                name: searchQuery,
                pageNumber: Number(pageInfo.pageNumber) + 1,
            });
            navigate(`/page/${Number(pageInfo.pageNumber) + 1}`);
        }
    };

    return (
        <div className="pagination">
            <button type="button" className="prev" onClick={prevClickHandler} disabled={pageInfo.firstPage}>
                Prev
            </button>
            <button type="button" className="next" onClick={nextClickHandler} disabled={pageInfo.lastPage}>
                Next
            </button>
        </div>
    );
}
