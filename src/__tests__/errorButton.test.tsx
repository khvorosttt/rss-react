import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorButton from '../components/ErrorButton/ErrorButton';

describe('test error button component', () => {
    it('should throw an error when the button is clicked', async () => {
        render(<ErrorButton />);
        const errorButton = screen.getByText(/Throw error/i);
        try {
            await userEvent.click(errorButton);
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toEqual('The error eject button was pressed');
            }
        }
    });
});
