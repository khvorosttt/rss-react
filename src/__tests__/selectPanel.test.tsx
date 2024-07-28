import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectedPanel from '../components/SelectedPanel/SelectedPanel';
import renderWithProviders from './renderWithProviders';
import { testAnimals } from './data';
import handlers from './mock/handlers';
import { addSelectedCard } from '../services/features/animalsSlice';

vi.mock('react-router', () => ({
    URL: {
        createObjectURL: vi.fn(),
    },
}));

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('test select panel component', () => {
    const blobMock = 'testFile.csv';

    beforeEach(() => {
        URL.createObjectURL = () => blobMock;
        vi.clearAllMocks();
    });

    it('should display count selected animals', () => {
        renderWithProviders(
            <MemoryRouter>
                <SelectedPanel selectedAnimals={testAnimals.slice(0, 3)} />
            </MemoryRouter>
        );
        expect(screen.getByText(`${3} items are selected`)).toBeInTheDocument();
    });

    it('should unselect all animals', async () => {
        const { store } = renderWithProviders(
            <MemoryRouter>
                <SelectedPanel selectedAnimals={testAnimals.slice(0, 3)} />
            </MemoryRouter>
        );
        store.dispatch(addSelectedCard(testAnimals[0]));
        store.dispatch(addSelectedCard(testAnimals[1]));
        const unselectButton = screen.getByText(/Unselect all/i);
        await userEvent.click(unselectButton);
        expect(store.getState().animals.selectedAnimals).toEqual([]);
    });
});
