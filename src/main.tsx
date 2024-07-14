import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import CardDetail from './components/CardDetail/CardDetail';
import { getAnimal } from './services/api/Api';
import Search from './components/Search/Search';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/page/1" replace />,
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
        <RouterProvider router={router} />
    </React.StrictMode>
);
