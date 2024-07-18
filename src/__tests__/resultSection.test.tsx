import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { testAnimals } from './data';
import ResultSection from '../components/ResultSection/ResultSection';

describe('test result section component', () => {
    it(`should display ${testAnimals.length} cards`, () => {
        const { container } = render(
            <BrowserRouter>
                <ResultSection result={testAnimals} isLoading={false} />
            </BrowserRouter>
        );
        expect(container.querySelectorAll('.card').length).toBe(testAnimals.length);
    });

    it('should display empty message', () => {
        render(
            <BrowserRouter>
                <ResultSection result={[]} isLoading={false} />
            </BrowserRouter>
        );
        expect(screen.getByText('No results were found for your request')).toBeInTheDocument();
    });
});
