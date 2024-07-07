import { ChangeEvent, Component, ReactNode } from 'react';
import SearchSection from '../SearchSection/SearchSection';
import ResultSection from '../ResultSection/ResultSection';
import Api, { AnimalBody, ResponseBody } from '../../services/api/Api';

export default class Search extends Component<
    Record<string, never>,
    { searchQuery: string; searchResult: AnimalBody[] }
> {
    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            searchQuery: '',
            searchResult: [],
        };
    }

    componentDidMount(): void {
        const savedSearch: string | null = localStorage.getItem('savedSearch');
        if (savedSearch) {
            this.setState({
                searchQuery: savedSearch,
            });
        }
        this.handlerSearch(savedSearch || '');
    }

    handlerSearch = async (name: string) => {
        const data: ResponseBody = await Api.fetchData(name);
        this.setState({
            searchResult: data.animals,
        });
    };

    handlerInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchQuery: event.target.value.trim(),
        });
    };

    handleSearchButton = () => {
        const { searchQuery } = this.state;
        localStorage.setItem('savedSearch', searchQuery);
        this.handlerSearch(searchQuery);
    };

    render(): ReactNode {
        const { searchResult } = this.state;
        return (
            <div>
                <SearchSection inputChange={this.handlerInput} searchButton={this.handleSearchButton} />
                <ResultSection result={searchResult} />
            </div>
        );
    }
}
