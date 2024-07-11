import { PureComponent, ReactNode } from 'react';

interface SearchButtonProps {
    onClick: () => void;
}

export default class SearchButton extends PureComponent<SearchButtonProps> {
    render(): ReactNode {
        const { onClick } = this.props;
        return (
            <button className="search-button" type="button" onClick={onClick}>
                Search
            </button>
        );
    }
}
