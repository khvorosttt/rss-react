import { BrowserRouter } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectedPanel from '../components/SelectedPanel/SelectedPanel';
import renderWithProviders from './renderWithProviders';
import { testAnimals } from './data';
import { addSelectedCard } from '../services/features/animalsSlice';

vi.mock('react-router', () => ({
    URL: {
        createObjectURL: vi.fn(),
    },
}));

describe('test select panel component', () => {
    const blobMock = 'testFile.csv';

    beforeEach(() => {
        URL.createObjectURL = () => blobMock;
        vi.clearAllMocks();
    });

    it('should display count selected animals', () => {
        const { store } = renderWithProviders(
            <BrowserRouter>
                <SelectedPanel />
            </BrowserRouter>
        );
        store.dispatch(addSelectedCard(testAnimals[0]));
        store.dispatch(addSelectedCard(testAnimals[1]));
        store.dispatch(addSelectedCard(testAnimals[3]));
        waitFor(() => {
            expect(screen.getByText(`${3} items are selected`)).toBeInTheDocument();
        });
    });

    it('should unselect all animals', async () => {
        const { store } = renderWithProviders(
            <BrowserRouter>
                <SelectedPanel />
            </BrowserRouter>
        );
        store.dispatch(addSelectedCard(testAnimals[0]));
        store.dispatch(addSelectedCard(testAnimals[1]));
        waitFor(async () => {
            const unselectButton = screen.getByText(/Unselect all/i);
            await userEvent.click(unselectButton);
            expect(store.getState().animals.selectedAnimals).toEqual([]);
        });
    });
});
