import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock } from 'vitest';
import renderWithProviders from './renderWithProviders';
import Pagination from '../components/Pagination/Pagination';
import { updateAnimals } from '../services/features/animalsSlice';
import { testAnimals, testPageInfo } from './data';
import { useRouter } from 'next/navigation';

vi.mock('react-router', () => ({
    useSelector: vi.fn(),
}));

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

describe('test pagination component', () => {
    const mockPush = vi.fn();

    beforeEach(() => {
        (useRouter as Mock).mockReturnValue({
            push: mockPush,
        });
        vi.clearAllMocks();
    });

    it('should go to previous page', async () => {
        const { store } = renderWithProviders(<Pagination />);
        await act(() => store.dispatch(updateAnimals({ animals: testAnimals, page: testPageInfo })));
        const prev = screen.getByText('Prev');
        await userEvent.click(prev);
        expect(mockPush).toHaveBeenCalledWith(`/?page=${testPageInfo.pageNumber - 1}&searchQuery=`);
    });

    it('should go to next page', async () => {
        const { store } = renderWithProviders(<Pagination />);
        await act(() => store.dispatch(updateAnimals({ animals: testAnimals, page: testPageInfo })));
        const next = screen.getByText('Next');
        await userEvent.click(next);
        expect(mockPush).toHaveBeenCalledWith(`/?page=${testPageInfo.pageNumber + 1}&searchQuery=`);
    });
});
