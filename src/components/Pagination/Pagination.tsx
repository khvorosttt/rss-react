import { PageInfo } from '../../services/api/Api';

interface PaginationProps {
    pageNumber: string | undefined;
    setPageNumber: (newValue: string) => void;
    pageInfo: PageInfo | undefined;
}

export default function Pagination({ pageNumber, setPageNumber, pageInfo }: PaginationProps) {
    const prevClickHandler = () => {
        if (pageInfo && !pageInfo.firstPage) {
            setPageNumber((Number(pageNumber) - 1).toString());
        }
    };

    const nextClickHandler = () => {
        if (pageInfo && !pageInfo.lastPage) {
            setPageNumber((Number(pageNumber) + 1).toString());
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
