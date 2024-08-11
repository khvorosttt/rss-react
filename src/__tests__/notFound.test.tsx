import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from '../../app/routes/$notFound';
import { useNavigate } from '@remix-run/react';
import userEvent from '@testing-library/user-event';
import { Mock } from 'vitest';

vi.mock('@remix-run/react', () => ({
    useSearchParams: () => [
        {
            get: (value: string) => {
                if (value === 'searchQuery') {
                    return 'test';
                }
                if (value === 'page') {
                    return '0';
                }
                return '1';
            },
        },
    ],
    useNavigate: vi.fn(),
}));

describe('Not Found Page Test', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        (useNavigate as Mock).mockReturnValue(mockNavigate);
        vi.clearAllMocks();
    });

    test('should show page not found with invalid address', async () => {
        render(<NotFoundPage />);
        expect(screen.getByText('Oops... The page corresponding to this address was not found.')).toBeInTheDocument();
    });

    test('should go back to previous page', async () => {
        render(<NotFoundPage />);
        const button = screen.getByText(/Back to animals list/i);
        await userEvent.click(button);
        waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(`/?page=0&searchQuery=test`);
        });
    });
});
