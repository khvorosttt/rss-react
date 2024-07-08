import { ChangeEvent, PureComponent } from 'react';
import Input from '../Input/Input';
import SearchButton from '../SearchButton/SearchButton';
import ErrorButton from '../ErrorButton/ErrorButton';

export interface SearchProps {
    searchQuery: string;
    inputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    searchButton: () => void;
}

export default class SearchSection extends PureComponent<SearchProps> {
    render() {
        const { searchQuery, inputChange, searchButton } = this.props;
        return (
            <div className="search-section">
                <Input searchQuery={searchQuery} onChange={inputChange} />
                <SearchButton onClick={searchButton} />
                <ErrorButton />
            </div>
        );
    }
}
