import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBounder from '../components/ErrorBounder/ErrorBounder';
import { ThemeVariant } from '../utils/ThemeProvider';
import ErrorButton from '../components/ErrorButton/ErrorButton';

describe('test error button component', () => {
    it('should throw an error when the button is clicked', async () => {
        render(<ErrorButton theme={ThemeVariant.light} />);
        const errorButton = screen.getByText(/Throw error/i);
        try {
            await userEvent.click(errorButton);
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toEqual('The error eject button was pressed');
            }
        }
    });

    it('should display error message in error bounder', async () => {
        render(
            <ErrorBounder>
                <ErrorButton theme={ThemeVariant.light} />
            </ErrorBounder>
        );
        const errorButton = screen.getByText(/Throw error/i);
        try {
            await userEvent.click(errorButton);
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toEqual('The error eject button was pressed');
                expect(screen.findByText(/An error occurred in the application./i));
            }
        }
    });
});
