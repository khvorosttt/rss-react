import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithProviders from './renderWithProviders';
import ThemeButton from '../components/ThemeButton/ThemeButton';

describe('test app component', () => {
    it('should change text in theme button', async () => {
        renderWithProviders(<ThemeButton />);
        const themeButton = screen.getByText('☼');
        await userEvent.click(themeButton);
        waitFor(() => {
            expect(screen.getByText('☽')).toBeInTheDocument();
        });
    });
});
