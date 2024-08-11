import { useContext } from 'react';
import { ThemeContext, ThemeVariant } from '../../utils/ThemeProvider';

export default function ThemeButton() {
    const { theme, setTheme } = useContext(ThemeContext);

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
