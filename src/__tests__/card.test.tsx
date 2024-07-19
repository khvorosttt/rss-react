import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Card from '../components/Card/Card';
import { testAnimals } from './data';

describe('test Card component', () => {
    it('should render the animal name', () => {
        render(
            <BrowserRouter>
                <Card animal={testAnimals[0]} pageId="0" />
            </BrowserRouter>
        );
        expect(screen.getByText(testAnimals[0].name)).toBeInTheDocument();
    });

    it('should stop propagation when link clicked', async () => {
        const stopPropagation = vi.fn();
        render(
            <BrowserRouter>
                <Card animal={testAnimals[0]} pageId="0" />
            </BrowserRouter>
        );
        const card = screen.getByRole('link');
        card.addEventListener('click', stopPropagation);
        await userEvent.click(card);
        expect(stopPropagation).toBeCalled();
    });

    it('should open card detail', async () => {
        render(
            <BrowserRouter>
                <Card animal={testAnimals[0]} pageId="0" />
            </BrowserRouter>
        );
        const card = screen.getByRole('link');
        await userEvent.click(card);
        await waitFor(() => {
            expect(window.location.pathname + window.location.search).toBe(`/page/0/?detail=${testAnimals[0].uid}`);
        });
    });
});
