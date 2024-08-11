import { ChangeEvent, useContext, useState } from 'react';
import { useNavigate, useSearchParams } from '@remix-run/react';
import { ThemeContext } from '../../utils/ThemeProvider';
import './searchSection.css';

export default function SearchSection() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('searchQuery') || '';
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState(searchQuery);
    const { theme } = useContext(ThemeContext);

    const clickSearchButtonHandler = () => {
        if (inputValue !== searchQuery) {
            navigate(`/?page=0&searchQuery=${inputValue}`);
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
