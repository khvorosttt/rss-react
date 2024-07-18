import { render, screen } from '@testing-library/react';
import Loader from '../components/Loader/Loader';

describe('test loader', () => {
    it('should display loader', async () => {
        const testIsLoading = true;
        const { container } = render(
            <Loader isLoading={testIsLoading}>
                <p>Test children</p>
            </Loader>
        );
        expect(container.querySelector('loader')).toBeDefined();
    });

    it('should display loader children', async () => {
        const testIsLoading = false;
        render(
            <Loader isLoading={testIsLoading}>
                <p>Test children</p>
            </Loader>
        );
        expect(screen.getByText(/Test children/i)).toBeInTheDocument();
    });
});
