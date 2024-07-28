import { setupServer } from 'msw/node';
import { act, screen, waitFor } from '@testing-library/react';
import { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router';
import { MemoryRouter } from 'react-router-dom';
import handlers from './mock/handlers';
import renderWithProviders from './renderWithProviders';
import CardDetail from '../components/CardDetail/CardDetail';
import { testAnimals } from './data';
import { updateCurrentCardDetail } from '../services/features/animalsSlice';
import { getFieldStatus } from '../utils/constants';

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

vi.mock('react-router', () => ({
    useParams: () => ({ pageId: '1' }),
    useNavigate: vi.fn(),
    useSelector: vi.fn(),
}));

describe('test card detail component', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        (useNavigate as Mock).mockReturnValue(mockNavigate);
        vi.clearAllMocks();
    });

    it('should display detail about animal', async () => {
        const { store } = renderWithProviders(
            <MemoryRouter initialEntries={['?detail=0']}>
                <CardDetail />
            </MemoryRouter>
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

    it('should display error message', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['?detail=a']}>
                <CardDetail />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText('Error loading animal data'));
        });
    });

    it('should click close button', async () => {
        const { store } = renderWithProviders(
            <MemoryRouter initialEntries={['?detail=0']}>
                <CardDetail />
            </MemoryRouter>
        );
        await act(() => store.dispatch(updateCurrentCardDetail(testAnimals[0])));
        await waitFor(async () => {
            const closeButton = screen.getByText(/Close/i);
            await userEvent.click(closeButton);
            expect(mockNavigate).toHaveBeenCalledWith('/page/1');
        });
    });
});
