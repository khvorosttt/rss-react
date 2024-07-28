import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useState } from 'react';
import { ThemeContext, ThemeVariant } from './utils/constants';
import store from './store/store';
import './app.css';
import router from './components/router/router';

export default function App() {
    const [theme, setTheme] = useState<ThemeVariant>(ThemeVariant.light);

    const changeTheme = () => {
        if (theme === ThemeVariant.light) {
            setTheme(ThemeVariant.dark);
        } else {
            setTheme(ThemeVariant.light);
        }
    };

    return (
        <Provider store={store}>
            <ThemeContext.Provider value={theme}>
                <div className={`app-background ${theme}`}>
                    <button type="button" className={`button-theme ${theme}-button`} onClick={changeTheme}>
                        {theme === ThemeVariant.light ? '☼' : '☽'}
                    </button>
                    <RouterProvider router={router} />
                </div>
            </ThemeContext.Provider>
        </Provider>
    );
}
