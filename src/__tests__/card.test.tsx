import { act, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Card from '../components/Card/Card';
import { testAnimals } from './data';
import renderWithProviders from './renderWithProviders';
import currentStore from '../store/store';
import { ThemeVariant } from '../utils/ThemeProvider';

describe('test Card component', () => {
    it('should render the animal name', () => {
        renderWithProviders(
            <BrowserRouter>
                <Card animal={testAnimals[0]} pageId="0" theme={ThemeVariant.light} />
            </BrowserRouter>,
            { store: currentStore }
        );
        expect(screen.getByText(testAnimals[0].name)).toBeInTheDocument();
    });

    it('should open card detail', async () => {
        renderWithProviders(
            <BrowserRouter>
                <Card animal={testAnimals[0]} pageId="0" theme={ThemeVariant.light} />
            </BrowserRouter>,
            { store: currentStore }
        );
        const card = screen.getByRole('link');
        await act(() => {
            userEvent.click(card);
        });
        await waitFor(() => {
            expect(window.location.pathname + window.location.search).toBe(
                `/?page=0&searchQuery=&detail=${testAnimals[0].uid}`
            );
        });
    });

    it('should change checkbox', async () => {
        const { store } = renderWithProviders(
            <BrowserRouter>
                <Card animal={testAnimals[0]} pageId="0" theme={ThemeVariant.light} />
            </BrowserRouter>
        );
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
        expect(store.getState().animals.selectedAnimals).toEqual([]);
        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        expect(store.getState().animals.selectedAnimals).toEqual(testAnimals.slice(0, 1));
        await userEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
        expect(store.getState().animals.selectedAnimals).toEqual([]);
    });
});
