import { render, screen } from '@testing-library/react';
import Loader from '../components/Loader/Loader';

describe('test loader', () => {
    it('should display loader', async () => {
        render(<Loader />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});
