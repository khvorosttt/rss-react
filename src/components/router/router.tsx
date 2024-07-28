import { Navigate } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from '../../Page/NotFoundPage/NotFoundPage';
import SearchPage from '../../Page/SearchPage/SearchPage';
import CardDetail from '../CardDetail/CardDetail';

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

export default router;
