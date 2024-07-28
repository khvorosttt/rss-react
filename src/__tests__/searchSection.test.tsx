import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Mock } from 'vitest';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchSection from '../components/SearchSection/SearchSection';
import renderWithProviders from './renderWithProviders';
import { updateSearchQuery } from '../services/features/animalsSlice';

vi.mock('react-router', () => ({
    useParams: () => ({ pageId: '1' }),
    useNavigate: vi.fn(),
}));

describe('test searchSection componenr', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        (useNavigate as Mock).mockReturnValue(mockNavigate);
        vi.clearAllMocks();
    });

    it('should change input value and searchQuery on the store', async () => {
        const { store } = renderWithProviders(
            <MemoryRouter initialEntries={['?page=0']}>
                <SearchSection />
            </MemoryRouter>
        );
        expect(store.getState().animals.searchQuery).toEqual('');
        await act(() => store.dispatch(updateSearchQuery('test')));
        expect(store.getState().animals.searchQuery).toEqual('test');
        const input: HTMLInputElement = screen.getByPlaceholderText('Enter the name of the animal');
        waitFor(() => {
            expect(input.value).toBe('test');
        });
    });

    it('should work clicking on search button', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['?page=0']}>
                <SearchSection />
            </MemoryRouter>
        );
        const searchButton = screen.getByText(/Search/i);
        await userEvent.click(searchButton);
        expect(mockNavigate).toHaveBeenCalledWith('/page/0');
    });
});
