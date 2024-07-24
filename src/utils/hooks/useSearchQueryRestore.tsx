import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function useSearchQueryRestore() {
    const getLocalStorageSearchQuery = () => {
        return localStorage.getItem('savedSearch') || '';
    };

    const [inputValue, setInputValue] = useState(getLocalStorageSearchQuery);
    const [searchQuery, setSearchQuery] = useState(getLocalStorageSearchQuery);
    const searchQueryRef = useRef(searchQuery);

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value.trim());
    };

    const setSearchValues = () => {
        searchQueryRef.current = inputValue;
        setSearchQuery(inputValue);
    };

    useEffect(() => {
        return () => {
            localStorage.setItem('savedSearch', searchQueryRef.current);
        };
    }, []);

    return {
        inputValue,
        searchQuery,
        setSearchValues,
        handleChangeInput,
    };
}
