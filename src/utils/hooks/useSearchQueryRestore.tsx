import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AnimalBody, ResponseBody, fetchData, PageInfo } from '../../services/api/Api';

export default function useSearchQueryRestore() {
    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const searchQueryRef = useRef('');
    const [pageInfo, setPageInfo] = useState<PageInfo>();
    const [searchResult, setSearchResult] = useState<AnimalBody[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { pageId } = useParams<{ pageId: string }>();
    const [currentPage, setCurrentPage] = useState(pageId);
    const navigate = useNavigate();

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value.trim());
    };

    const handlerSearchData = useCallback(
        async (name: string, pageNumber: number) => {
            setIsLoading(true);
            if (!/^\d+$/.test(pageNumber.toString())) {
                navigate('/not-found');
            }
            const data: ResponseBody = await fetchData(name, pageNumber);
            setSearchResult(data.animals);
            setPageInfo(data.page);
            setIsLoading(false);
        },
        [navigate]
    );

    const setSearchValues = () => {
        searchQueryRef.current = inputValue;
        setSearchQuery(inputValue);
    };

    useEffect(() => {
        const savedSearch: string | null = localStorage.getItem('savedSearch');
        if (savedSearch) {
            searchQueryRef.current = savedSearch;
            setSearchQuery(savedSearch);
            setInputValue(savedSearch);
        } else {
            setSearchQuery('');
        }
    }, [searchQuery]);

    useEffect(() => {
        handlerSearchData(searchQueryRef.current, Number(currentPage));
        return () => {
            localStorage.setItem('savedSearch', searchQueryRef.current);
        };
    }, [searchQuery, currentPage, handlerSearchData]);

    return {
        inputValue,
        searchQueryRef,
        setSearchQuery,
        setSearchValues,
        handleChangeInput,
        handlerSearchData,
        searchResult,
        isLoading,
        pageInfo,
        setCurrentPage,
    };
}
