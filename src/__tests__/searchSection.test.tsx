import { MemoryRouter } from 'react-router-dom';
import { Mock } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchSection from '../components/SearchSection/SearchSection';
import renderWithProviders from './renderWithProviders';
import { useNavigate } from '@remix-run/react';

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

describe('test searchSection componenr', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        (useNavigate as Mock).mockReturnValue(mockNavigate);
        vi.clearAllMocks();
    });

    it('should work clicking on search button', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['?page=0']}>
                <SearchSection />
            </MemoryRouter>
        );
        const searchButton = screen.getByText(/Search/i);
        await userEvent.click(searchButton);
        waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(`/?page=0&searchQuery=test`);
        });
    });
});
