import { useSearchParams } from '@remix-run/react';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { PageInfo } from '../../services/types';
import { ThemeContext } from '../../utils/ThemeProvider';
import './pagination.css';

export default function Pagination({ pageInfo }: { pageInfo: PageInfo }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('searchQuery') || '';
    const { theme } = useContext(ThemeContext);

    const prevClickHandler = () => {
        if (pageInfo && !pageInfo.firstPage) {
            navigate(`/?page=${Number(pageInfo.pageNumber) - 1}&searchQuery=${searchQuery}`);
        }
    };

    const nextClickHandler = () => {
        if (pageInfo && !pageInfo.lastPage) {
            navigate(`/?page=${Number(pageInfo.pageNumber) + 1}&searchQuery=${searchQuery}`);
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
