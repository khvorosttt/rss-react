import { render, screen, waitFor } from '@testing-library/react';
import RootLayout from '../pages/layout';

describe('test layout', () => {
    it('should display layout', () => {
        render(<RootLayout>Test children</RootLayout>);
        waitFor(() => {
            expect(screen.getByRole('layout')).toBeInTheDocument();
            expect(screen.getByText(/Test children/i)).toBeInTheDocument();
        });
    });
});
