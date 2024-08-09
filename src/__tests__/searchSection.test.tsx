import { Mock } from 'vitest';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchSection from '../components/SearchSection/SearchSection';
import renderWithProviders from './renderWithProviders';
import { updateSearchQuery } from '../services/features/animalsSlice';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

describe('test searchSection componenr', () => {
    const mockPush = vi.fn();

    beforeEach(() => {
        (useRouter as Mock).mockReturnValue({
            push: mockPush,
        });
        vi.clearAllMocks();
    });

    it('should change input value and searchQuery on the store', async () => {
        const { store } = renderWithProviders(<SearchSection searchQuery={''} />);
        expect(store.getState().animals.searchQuery).toEqual('');
        await act(() => store.dispatch(updateSearchQuery('test')));
        expect(store.getState().animals.searchQuery).toEqual('test');
        const input: HTMLInputElement = screen.getByPlaceholderText('Enter the name of the animal');
        waitFor(() => {
            expect(input.value).toBe('test');
        });
    });

    it('should work clicking on search button', async () => {
        renderWithProviders(<SearchSection searchQuery={''} />);
        const searchButton = screen.getByText(/Search/i);
        await userEvent.click(searchButton);
        expect(mockPush).toHaveBeenCalledWith('/?page=0&searchQuery=');
    });
});
