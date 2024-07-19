import { render, screen, waitFor } from '@testing-library/react';
import { Mock } from 'vitest';
import { useLoaderData, useNavigate } from 'react-router';
import userEvent from '@testing-library/user-event';
import CardDetail from '../components/CardDetail/CardDetail';
import { testAnimals } from './data';
import { getFieldStatus } from '../utils/hooks/constants';

vi.mock('react-router', () => ({
    useLoaderData: vi.fn(),
    useParams: () => ({ pageId: '1' }),
    useNavigate: vi.fn(),
}));

describe('test card detail', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        (useNavigate as Mock).mockReturnValue(mockNavigate);
        (useLoaderData as Mock).mockReturnValue({ animal: testAnimals[0] });
        vi.clearAllMocks();
    });
    it('should display detail of card component', () => {
        render(<CardDetail />);
        expect(screen.getByText('Animal')).toBeInTheDocument();
        expect(screen.getByText(`Name: ${testAnimals[0].name}`));
        expect(screen.getByText(`Earth Animal: ${getFieldStatus(testAnimals[0].earthAnimal)}`));
        expect(screen.getByText(`Earth Insect: ${getFieldStatus(testAnimals[0].earthInsect)}`));
        expect(screen.getByText(`Avian: ${getFieldStatus(testAnimals[0].avian)}`));
        expect(screen.getByText(`Canine: ${getFieldStatus(testAnimals[0].canine)}`));
        expect(screen.getByText(`Feline: ${getFieldStatus(testAnimals[0].feline)}`));
    });

    it('should close the detail component when the button is clicked', async () => {
        render(<CardDetail />);
        const closeButton = screen.getByText(/Close/i);
        await userEvent.click(closeButton);
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/page/1');
        });
    });
});
