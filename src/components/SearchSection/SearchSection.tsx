import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import Input from '../Input/Input';
import SearchButton from '../SearchButton/SearchButton';
import ErrorButton from '../ErrorButton/ErrorButton';
import useSearchQueryRestore from '../../utils/hooks/useSearchQueryRestore';
import { updateAnimals, updateSearchQuery } from '../../services/features/animalsSlice';
import { useGetAnimalsByNameMutation } from '../../services/api/animalsApi';
import './searchSection.css';

export default function SearchSection() {
    const { inputValue, setSearchValues, handleChangeInput } = useSearchQueryRestore();
    const [getAnimalsByName, { data, isLoading }] = useGetAnimalsByNameMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pageId } = useParams<{ pageId: string }>();

    const clickSearchButtonHandler = () => {
        setSearchValues();
        dispatch(updateSearchQuery(inputValue));
        getAnimalsByName({
            name: inputValue,
            pageNumber: Number(pageId),
        });
        navigate(`/page/0`);
    };

    useEffect(() => {
        if (!isLoading && data) {
            dispatch(updateAnimals({ animals: data.animals, page: data.page }));
        }
    }, [data, isLoading, dispatch]);

    useEffect(() => {
        dispatch(updateSearchQuery(inputValue));
        getAnimalsByName({
            name: inputValue,
            pageNumber: Number(pageId),
        });
    }, [pageId, dispatch]);

    return (
        <div className="search-section">
            <Input searchQuery={inputValue} onChange={handleChangeInput} />
            <SearchButton onClick={clickSearchButtonHandler} />
            <ErrorButton />
        </div>
    );
}
