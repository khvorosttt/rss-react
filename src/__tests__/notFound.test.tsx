import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderWithProviders from './renderWithProviders';
import NotFoundPage from '../pages/404';
import { useRouter } from 'next/router';
import { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('react-router', () => ({
    useSelector: vi.fn(),
}));

vi.mock('next/router', () => ({
    useRouter: vi.fn(),
}));

describe('Not Found Page Test', () => {
    const mockPush = vi.fn();

    beforeEach(() => {
        (useRouter as Mock).mockReturnValue({
            push: mockPush,
        });
    });

    test('should show page not found with invalid address', async () => {
        renderWithProviders(<NotFoundPage />);
        expect(screen.getByText('Oops... The page corresponding to this address was not found.')).toBeInTheDocument();
    });

    test('should go back to the page with animals', async () => {
        renderWithProviders(<NotFoundPage />);
        const backButton = screen.getByText(/Back to animals list/i);
        await userEvent.click(backButton);
        expect(mockPush).toHaveBeenCalledWith('/?page=0&searchQuery=');
    });
});
