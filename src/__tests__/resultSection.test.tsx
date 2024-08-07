import { waitFor, screen } from '@testing-library/react';
import ResultSection from '../components/ResultSection/ResultSection';
import renderWithProviders from './renderWithProviders';
import { elementsOnPage } from '../services/types';
import { updateAnimals } from '../services/features/animalsSlice';
import { testAnimals, testPageInfo } from './data';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';

vi.mock('react-router', () => ({
    useSelector: vi.fn(),
}));

vi.mock('next/navigation', () => ({
    useSearchParams: vi.fn(),
    useRouter: vi.fn(),
}));

describe('test result section', () => {
    const mockPush = vi.fn();

    beforeEach(() => {
        (useRouter as Mock).mockReturnValue({
            push: mockPush,
        });
        (useSearchParams as Mock).mockReturnValue({
            get: (value: string) => {
                return value;
            },
        });
    });

    it(`should display ${elementsOnPage} on page`, async () => {
        const { store } = renderWithProviders(<ResultSection />);
        store.dispatch(updateAnimals({ animals: testAnimals.slice(0, elementsOnPage), page: testPageInfo }));
        await waitFor(() => {
            expect(screen.getAllByRole('button').length).toBe(elementsOnPage);
        });
    });

    it(`should display empty message`, async () => {
        renderWithProviders(<ResultSection />);
        await waitFor(() => {
            expect(screen.getByText(/No results were found for your request/i)).toBeInTheDocument();
        });
    });
});
