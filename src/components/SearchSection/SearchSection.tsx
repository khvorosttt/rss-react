import { useDispatch } from 'react-redux';
import { ChangeEvent, useContext, useState } from 'react';
import { updateLoading } from '../../services/features/animalsSlice';
import { ThemeContext } from '../../utils/ThemeProvider';
import { useRouter } from 'next/navigation';

export default function SearchSection({ searchQuery }: { searchQuery: string }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [inputValue, setInputValue] = useState(searchQuery);
    const { theme } = useContext(ThemeContext);

    const clickSearchButtonHandler = () => {
        if (inputValue !== searchQuery) {
            dispatch(updateLoading(true));
            router.push(`/?page=0&searchQuery=${inputValue}`);
        }
    };

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value.trim());
    };

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
        </div>
    );
}
