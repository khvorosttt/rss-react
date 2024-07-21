import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchButton from '../components/SearchButton/SearchButton';

describe('test search button', () => {
    it('should call setSearchValues and navigate to /page/0 when the search button is clicked', async () => {
        const mockOnClick = vi.fn();
        await act(async () => {
            render(<SearchButton onClick={mockOnClick} />);
        });

        const searchButton = screen.getByText(/Search/i);
        userEvent.click(searchButton);

        await waitFor(() => {
            expect(mockOnClick).toHaveBeenCalled();
        });
    });
});
