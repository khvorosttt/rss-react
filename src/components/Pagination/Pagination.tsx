import { useNavigate } from 'react-router';
import { PageInfo } from '../../services/api/Api';
import './pagination.css';

interface PaginationProps {
    setPageNumber: (newValue: string) => void;
    pageInfo: PageInfo | undefined;
}

export default function Pagination({ setPageNumber, pageInfo }: PaginationProps) {
    const navigate = useNavigate();

    const prevClickHandler = () => {
        if (pageInfo && !pageInfo.firstPage) {
            setPageNumber((Number(pageInfo.pageNumber) - 1).toString());
            navigate(`/page/${Number(pageInfo.pageNumber) - 1}`);
        }
    };

    const nextClickHandler = () => {
        if (pageInfo && !pageInfo.lastPage) {
            setPageNumber((Number(pageInfo.pageNumber) + 1).toString());
            navigate(`/page/${Number(pageInfo.pageNumber) + 1}`);
        }
    };

    return (
        <div className="pagination">
            <button type="button" className="prev" onClick={prevClickHandler}>
                Prev
            </button>
            <button type="button" className="next" onClick={nextClickHandler}>
                Next
            </button>
        </div>
    );
}
