import { ChangeEvent, PureComponent } from 'react';
import Input from '../Input/Input';
import SearchButton from '../SearchButton/SearchButton';
import ErrorButton from '../ErrorButton/ErrorButton';

export interface SearchProps {
    inputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    searchButton: () => void;
}

export default class SearchSection extends PureComponent<SearchProps> {
    render() {
        const { inputChange, searchButton } = this.props;
        return (
            <div className="search-section">
                <Input onChange={inputChange} />
                <SearchButton onClick={searchButton} />
                <ErrorButton />
            </div>
        );
    }
}
