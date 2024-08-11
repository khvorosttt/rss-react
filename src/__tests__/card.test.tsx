import { act, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, Mock } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Card from '../components/Card/Card';
import { testAnimals } from './data';
import renderWithProviders from './renderWithProviders';
import currentStore from '../store/store';
import { ThemeVariant } from '../utils/ThemeProvider';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

describe('test Card component', () => {
    const mockPush = vi.fn();

    beforeEach(() => {
        (useRouter as Mock).mockReturnValue({
            push: mockPush,
        });
        vi.clearAllMocks();
    });

    it('should render the animal name', () => {
        renderWithProviders(<Card animal={testAnimals[0]} pageId="0" theme={ThemeVariant.light} />, {
            store: currentStore,
        });
        expect(screen.getByText(testAnimals[0].name)).toBeInTheDocument();
    });

    it('should open card detail', async () => {
        renderWithProviders(<Card animal={testAnimals[0]} pageId="0" theme={ThemeVariant.light} />, {
            store: currentStore,
        });
        const detailButton = screen.getByText(/Show Details/i);
        await act(() => {
            userEvent.click(detailButton);
        });
        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith(`/?page=0&searchQuery=&detailId=${testAnimals[0].uid}`);
        });
    });

    it('should change checkbox', async () => {
        const { store } = renderWithProviders(<Card animal={testAnimals[0]} pageId="0" theme={ThemeVariant.light} />, {
            store: currentStore,
        });
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
        expect(store.getState().animals.selectedAnimals).toEqual([]);
        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        expect(store.getState().animals.selectedAnimals).toEqual(testAnimals.slice(0, 1));
        await userEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
        expect(store.getState().animals.selectedAnimals).toEqual([]);
    });
});
