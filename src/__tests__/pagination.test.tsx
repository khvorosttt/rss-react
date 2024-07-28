import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock } from 'vitest';
import handlers from './mock/handlers';
import renderWithProviders from './renderWithProviders';
import Pagination from '../components/Pagination/Pagination';
import { updateAnimals } from '../services/features/animalsSlice';
import { testAnimals, testPageInfo } from './data';

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

vi.mock('react-router', () => ({
    useParams: () => ({ pageId: '1' }),
    useNavigate: vi.fn(),
    useSelector: vi.fn(),
}));

describe('test pagination component', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        (useNavigate as Mock).mockReturnValue(mockNavigate);
        vi.clearAllMocks();
    });

    it('should go to previous page', async () => {
        const { store } = renderWithProviders(
            <BrowserRouter>
                <Pagination />
            </BrowserRouter>
        );
        await act(() => store.dispatch(updateAnimals({ animals: testAnimals, page: testPageInfo })));
        const prev = screen.getByText('Prev');
        await userEvent.click(prev);
        expect(mockNavigate).toHaveBeenCalledWith(`/page/${testPageInfo.pageNumber - 1}`);
    });

    it('should go to next page', async () => {
        const { store } = renderWithProviders(
            <BrowserRouter>
                <Pagination />
            </BrowserRouter>
        );
        await act(() => store.dispatch(updateAnimals({ animals: testAnimals, page: testPageInfo })));
        const next = screen.getByText('Next');
        await userEvent.click(next);
        expect(mockNavigate).toHaveBeenCalledWith(`/page/${testPageInfo.pageNumber + 1}`);
    });
});
