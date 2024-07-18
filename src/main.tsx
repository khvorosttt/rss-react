import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import CardDetail from './components/CardDetail/CardDetail';
import { getAnimal } from './services/api/Api';
import Search from './components/Search/Search';
import ErrorBounder from './components/ErrorBounder/ErrorBounder';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/page/0" replace />,
        errorElement: <NotFound />,
    },
    {
        path: '/page/:pageId',
        element: <Search />,
        errorElement: <NotFound />,
        children: [
            {
                path: '',
                loader: getAnimal,
                element: <CardDetail />,
                errorElement: <NotFound />,
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
