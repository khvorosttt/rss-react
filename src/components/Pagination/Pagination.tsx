import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { PageInfo } from '../../services/types';
import { RootState } from '../../store/store';
import { useRouter } from 'next/router';
import { ThemeContext } from '../../utils/ThemeProvider';

export default function Pagination() {
    const router = useRouter();
    const searchQuery: string = useSelector((state: RootState) => state.animals.searchQuery);
    const pageInfo: PageInfo = useSelector((state: RootState) => state.animals.pageInfo);
    const { theme } = useContext(ThemeContext);

    const prevClickHandler = () => {
        if (pageInfo && !pageInfo.firstPage) {
            router.push(`/?page=${Number(pageInfo.pageNumber) - 1}&searchQuery=${searchQuery}`);
        }
    };

    const nextClickHandler = () => {
        if (pageInfo && !pageInfo.lastPage) {
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
