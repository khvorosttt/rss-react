import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import NotFoundPage from './Page/NotFoundPage/NotFoundPage';
import CardDetail from './components/CardDetail/CardDetail';
import SearchPage from './Page/SearchPage/SearchPage';
import ErrorBounder from './components/ErrorBounder/ErrorBounder';

const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBounder>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ErrorBounder>
    </React.StrictMode>
);
