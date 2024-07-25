import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useContext, useEffect } from 'react';
import ErrorButton from '../ErrorButton/ErrorButton';
import useSearchQueryRestore from '../../utils/hooks/useSearchQueryRestore';
import { updateAnimals, updateSearchQuery } from '../../services/features/animalsSlice';
import { useGetAnimalsByNameMutation } from '../../services/api/animalsApi';
import './searchSection.css';
import { ThemeContext, ThemeVariant } from '../../utils/constants';

export default function SearchSection() {
    const { inputValue, setSearchValues, handleChangeInput } = useSearchQueryRestore();
    const [getAnimalsByName, { data, isLoading }] = useGetAnimalsByNameMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pageId } = useParams<{ pageId: string }>();
    const theme: ThemeVariant = useContext(ThemeContext);

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
            <input
                className={`search-input ${theme}-input`}
                value={inputValue}
                type="text"
                placeholder="Enter the name of the animal"
                onChange={handleChangeInput}
            />
            <button className={`search-button ${theme}-button`} type="button" onClick={clickSearchButtonHandler}>
                Search
            </button>
            <ErrorButton theme={theme} />
        </div>
    );
}
