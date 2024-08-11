import { act, screen, waitFor } from '@testing-library/react';
import { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import renderWithProviders from './renderWithProviders';
import CardDetail from '../components/CardDetail/CardDetail';
import { testAnimals } from './data';
import { updateCurrentCardDetail } from '../services/features/animalsSlice';
import { getFieldStatus } from '../utils/constants';
import { AnimalResponse } from '../services/types';
import { useNavigate, useNavigation } from '@remix-run/react';

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
    useNavigation: vi.fn(),
}));

describe('test card detail component', () => {
    const mockNavigate = vi.fn();
    const mockNavigation = {
        state: 'submitting',
    };
    const mockLoadingNavigation = {
        state: 'loading',
    };
    const testCurrentAnimal: AnimalResponse = {
        animal: testAnimals[0],
    };

    beforeEach(() => {
        (useNavigate as Mock).mockReturnValue(mockNavigate);
        vi.clearAllMocks();
    });

    it('should display detail about animal', async () => {
        (useNavigation as Mock).mockReturnValue(mockNavigation);
        const { store } = renderWithProviders(
            <BrowserRouter>
                <CardDetail cardInfo={testCurrentAnimal} />
            </BrowserRouter>
        );
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

    it('should display loader', async () => {
        (useNavigation as Mock).mockReturnValue(mockLoadingNavigation);
        renderWithProviders(
            <BrowserRouter>
                <CardDetail cardInfo={testCurrentAnimal} />
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.getByRole('status')).toBeInTheDocument();
        });
    });

    it('should click close button', async () => {
        const { store } = renderWithProviders(
            <BrowserRouter>
                <CardDetail cardInfo={testCurrentAnimal} />
            </BrowserRouter>
        );
        await act(() => store.dispatch(updateCurrentCardDetail(testAnimals[0])));
        waitFor(async () => {
            const closeButton = screen.getByText(/Close/i);
            await userEvent.click(closeButton);
            expect(mockNavigate).toHaveBeenCalledWith('/?page=0&searchQuery=test');
        });
    });
});
