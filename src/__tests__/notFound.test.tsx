import { Navigate, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '../Page/NotFoundPage/NotFoundPage';
import Search from '../Page/SearchPage/SearchPage';
import CardDetail from '../components/CardDetail/CardDetail';

describe('Not Found Page Test', () => {
    test('should show page not found with invalid address', async () => {
        const routes = [
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
                        element: <CardDetail />,
                        errorElement: <NotFound />,
                    },
                ],
            },
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ['/', '/page/0'],
        });

        render(<RouterProvider router={router} />);
        await act(async () => router.navigate('/test'));
        expect(screen.getByText('Oops... The page corresponding to this address was not found.')).toBeInTheDocument();
    });
});
