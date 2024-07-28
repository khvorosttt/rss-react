import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithProviders from './renderWithProviders';

describe('test app component', () => {
    it('should change text in theme button', async () => {
        renderWithProviders(<App />);
        const themeButton = screen.getByText('☼');
        await userEvent.click(themeButton);
        expect(screen.getByText('☽')).toBeInTheDocument();
    });
});
