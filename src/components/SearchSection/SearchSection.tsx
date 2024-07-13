import { ChangeEvent } from 'react';
import Input from '../Input/Input';
import SearchButton from '../SearchButton/SearchButton';
import ErrorButton from '../ErrorButton/ErrorButton';

export interface SearchProps {
    searchQuery: string;
    inputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    searchButton: () => void;
}

export default function SearchSection({ searchQuery, inputChange, searchButton }: SearchProps) {
    return (
        <div className="search-section">
            <Input searchQuery={searchQuery} onChange={inputChange} />
            <SearchButton onClick={searchButton} />
            <ErrorButton />
        </div>
    );
}
