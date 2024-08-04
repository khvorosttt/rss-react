import { useContext } from 'react';
import { ThemeContext } from '../../utils/ThemeProvider';

export default function ThemeButton() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('ThemeButton must be used within a ThemeProvider');
    }

    const { theme, setTheme } = context;

    // const { theme, setTheme } = useContext(ThemeContext);

    const changeTheme = () => {
        if (theme === ThemeVariant.light) {
            setTheme(ThemeVariant.dark);
        } else {
            setTheme(ThemeVariant.light);
        }
    };

    return (
        <button type="button" className={`button-theme ${theme}-button`} onClick={changeTheme}>
            {theme === ThemeVariant.light ? '☼' : '☽'}
        </button>
    );
}
