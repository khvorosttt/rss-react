import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Api, { AnimalBody, ResponseBody } from '../../services/api/Api';

export default function useSearchQueryRestore() {
    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const searchQueryRef = useRef('');
    const [searchResult, setSearchResult] = useState<AnimalBody[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value.trim());
    };

    const handlerSearchData = async (name: string) => {
        setIsLoading(true);
        const data: ResponseBody = await Api.fetchData(name);
        setSearchResult(data.animals);
        setIsLoading(false);
    };

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
    }, []);

    useEffect(() => {
        handlerSearchData(searchQueryRef.current);
        return () => {
            localStorage.setItem('savedSearch', searchQueryRef.current);
        };
    }, [searchQuery]);

    return { inputValue, searchQuery, setSearchQuery, setSearchValues, handleChangeInput, searchResult, isLoading };
}
