import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { PageInfo } from '../../services/types';
import { RootState } from '../../store/store';
import { ThemeContext } from '../../utils/ThemeProvider';
import { useRouter } from 'next/navigation';
import { updateLoading } from '../../services/features/animalsSlice';

export default function Pagination({ pageInfo }: { pageInfo: PageInfo }) {
    const router = useRouter();
    const searchQuery: string = useSelector((state: RootState) => state.animals.searchQuery);
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();

    const prevClickHandler = () => {
        if (pageInfo && !pageInfo.firstPage) {
            dispatch(updateLoading(true));
            router.push(`/?page=${Number(pageInfo.pageNumber) - 1}&searchQuery=${searchQuery}`);
        }
    };

    const nextClickHandler = () => {
        if (pageInfo && !pageInfo.lastPage) {
            dispatch(updateLoading(true));
            router.push(`/?page=${Number(pageInfo.pageNumber) + 1}&searchQuery=${searchQuery}`);
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
