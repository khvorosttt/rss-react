import { render, screen } from '@testing-library/react';
import App from '../pages/_app';
import { Router } from 'next/router';

describe('test _app.tsx', () => {
    const mockComponent = <div>Test component</div>;
    const mockProps = {
        Component: () => mockComponent,
        pageProps: {},
        router: {} as Router,
    };

    it('should display component in _app.tsx', () => {
        render(<App {...mockProps} />);
        expect(screen.getByText(/Test component/i));
    });
});
