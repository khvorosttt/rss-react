import SearchSection from '../SearchSection/SearchSection';
import ResultSection from '../ResultSection/ResultSection';
import ErrorBounder from '../ErrorBounder/ErrorBounder';
import useSearchQueryRestore from '../../utils/hooks/useSearchQueryRestore';

export default function Search() {
    const { inputValue, setSearchValues, handleChangeInput, searchResult, isLoading } = useSearchQueryRestore();

    const handleClickSearchButton = () => {
        setSearchValues();
    };
    return (
        <ErrorBounder>
            <SearchSection
                searchQuery={inputValue}
                inputChange={handleChangeInput}
                searchButton={handleClickSearchButton}
            />
            <ResultSection result={searchResult} isLoading={isLoading} />
        </ErrorBounder>
    );
}
