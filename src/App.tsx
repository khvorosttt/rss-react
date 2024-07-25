import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useState } from 'react';
import CardDetail from './components/CardDetail/CardDetail';
import NotFoundPage from './Page/NotFoundPage/NotFoundPage';
import SearchPage from './Page/SearchPage/SearchPage';
import { ThemeContext, ThemeVariant } from './utils/constants';
import store from './store/store';
import './app.css';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/page/0" replace />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/page/:pageId',
        element: <SearchPage />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '',
                element: <CardDetail />,
                errorElement: <NotFoundPage />,
            },
        ],
    },
]);

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
