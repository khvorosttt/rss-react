import { MemoryRouter } from 'react-router-dom';
import { waitFor, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import ResultSection from '../components/ResultSection/ResultSection';
import renderWithProviders from './renderWithProviders';
import { elementsOnPage } from '../services/types';
import { updateAnimals } from '../services/features/animalsSlice';
import { testAnimals, testPageInfo } from './data';
import handlers from './mock/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

vi.mock('react-router', () => ({
    useParams: () => ({ pageId: '1' }),
    useSelector: vi.fn(),
}));

describe('test result section', () => {
    it(`should display ${elementsOnPage} on page`, async () => {
        const { store } = renderWithProviders(
            <MemoryRouter initialEntries={['?page=0']}>
                <ResultSection />
            </MemoryRouter>
        );
        store.dispatch(updateAnimals({ animals: testAnimals.slice(0, elementsOnPage), page: testPageInfo }));
        await waitFor(() => {
            expect(screen.getAllByRole('link').length).toBe(elementsOnPage);
        });
    });

    it(`should display empty message`, async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['?page=0']}>
                <ResultSection />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText(/No results were found for your request/i)).toBeInTheDocument();
        });
    });
});
