import { act, screen, waitFor } from '@testing-library/react';
import { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import renderWithProviders from './renderWithProviders';
import CardDetail from '../components/CardDetail/CardDetail';
import { testAnimals } from './data';
import { updateCurrentCardDetail } from '../services/features/animalsSlice';
import { getFieldStatus } from '../utils/constants';
import { useRouter, useSearchParams } from 'next/navigation';

vi.mock('react-router', () => ({
    useSelector: vi.fn(),
}));

vi.mock('next/navigation', () => ({
    useSearchParams: vi.fn(),
    useRouter: vi.fn(),
}));

describe('test card detail component', () => {
    const mockPush = vi.fn();

    beforeEach(() => {
        (useRouter as Mock).mockReturnValue({
            push: mockPush,
        });
        (useSearchParams as Mock).mockReturnValue({
            get: () => {
                return '0';
            },
        });
    });

    it('should display detail about animal', async () => {
        const { store } = renderWithProviders(<CardDetail />);
        await act(() => store.dispatch(updateCurrentCardDetail(testAnimals[0])));
        await waitFor(() => {
            expect(screen.getByText('Animal')).toBeInTheDocument();
            expect(screen.getByText(`Name: ${testAnimals[0].name}`));
            expect(screen.getByText(`Earth Animal: ${getFieldStatus(testAnimals[0].earthAnimal)}`));
            expect(screen.getByText(`Earth Insect: ${getFieldStatus(testAnimals[0].earthInsect)}`));
            expect(screen.getByText(`Avian: ${getFieldStatus(testAnimals[0].avian)}`));
            expect(screen.getByText(`Canine: ${getFieldStatus(testAnimals[0].canine)}`));
            expect(screen.getByText(`Feline: ${getFieldStatus(testAnimals[0].feline)}`));
        });
    });

    it('should click close button', async () => {
        const { store } = renderWithProviders(<CardDetail />);
        act(() => store.dispatch(updateCurrentCardDetail(testAnimals[0])));
        const closeButton = screen.getByText(/Close/i);
        await userEvent.click(closeButton);
        expect(mockPush).toHaveBeenCalledWith('/?page=0&searchQuery=');
    });
});
