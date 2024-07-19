import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import NotFoundPage from './Page/NotFoundPage/NotFoundPage';
import CardDetail from './components/CardDetail/CardDetail';
import { getAnimal } from './services/api/Api';
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
                loader: getAnimal,
                element: <CardDetail />,
                errorElement: <NotFoundPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBounder>
            <RouterProvider router={router} />
        </ErrorBounder>
    </React.StrictMode>
);
