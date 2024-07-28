import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { PageInfo } from '../../services/types';
import './pagination.css';
import { RootState } from '../../store/store';
import { useLazyGetAnimalsByNameQuery } from '../../services/api/animalsApi';
import { updateAnimals } from '../../services/features/animalsSlice';
import { ThemeContext, ThemeVariant } from '../../utils/constants';

export default function Pagination() {
    const navigate = useNavigate();
    const pageInfo: PageInfo = useSelector((state: RootState) => state.animals.pageInfo);
    const [, { data, isFetching }] = useLazyGetAnimalsByNameQuery();
    const dispatch = useDispatch();
    const theme: ThemeVariant = useContext(ThemeContext);

    useEffect(() => {
        if (!isFetching && data) {
            dispatch(updateAnimals({ animals: data.animals, page: data.page }));
        }
    }, [data, isFetching, dispatch]);

    const prevClickHandler = () => {
        if (pageInfo && !pageInfo.firstPage) {
            navigate(`/page/${Number(pageInfo.pageNumber) - 1}`);
        }
    };

    const nextClickHandler = () => {
        if (pageInfo && !pageInfo.lastPage) {
            navigate(`/page/${Number(pageInfo.pageNumber) + 1}`);
        }
    };

    return (
        <div className="pagination">
            <button
                type="button"
                className={`prev ${theme}-button`}
                onClick={prevClickHandler}
                disabled={pageInfo.firstPage}
            >
                Prev
            </button>
            <button
                type="button"
                className={`next ${theme}-button`}
                onClick={nextClickHandler}
                disabled={pageInfo.lastPage}
            >
                Next
            </button>
        </div>
    );
}
