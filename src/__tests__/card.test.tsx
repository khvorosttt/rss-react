import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Card from '../components/Card/Card';
import { testAnimal } from './data';

describe('test Card component', () => {
    it('should render the animal name', () => {
        render(
            <BrowserRouter>
                <Card animal={testAnimal} pageId="0" />
            </BrowserRouter>
        );
        expect(screen.getByText(testAnimal.name)).toBeInTheDocument();
    });
});
