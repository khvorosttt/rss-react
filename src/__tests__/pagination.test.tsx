import { BrowserRouter } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock } from 'vitest';
import renderWithProviders from './renderWithProviders';
import Pagination from '../components/Pagination/Pagination';
import { testPageInfo } from './data';
import { useNavigate } from '@remix-run/react';

vi.mock('@remix-run/react', () => ({
    useSearchParams: () => [
        {
            get: (value: string) => {
                if (value === 'searchQuery') {
                    return 'test';
                }
                if (value === 'page') {
                    return '0';
                }
                return '1';
            },
        },
    ],
    useNavigate: vi.fn(),
}));

describe('test pagination component', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        (useNavigate as Mock).mockReturnValue(mockNavigate);
        vi.clearAllMocks();
    });

    it('should go to previous page', async () => {
        renderWithProviders(
            <BrowserRouter>
                <Pagination pageInfo={testPageInfo} />
            </BrowserRouter>
        );
        const prev = screen.getByText('Prev');
        await userEvent.click(prev);
        waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(`/?page=${testPageInfo.pageNumber - 1}&searchQuery=test`);
        });
    });

    it('should go to next page', async () => {
        renderWithProviders(
            <BrowserRouter>
                <Pagination pageInfo={testPageInfo} />
            </BrowserRouter>
        );
        const next = screen.getByText('Next');
        await userEvent.click(next);
        waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(`/?page=${testPageInfo.pageNumber + 1}&searchQuery=test`);
        });
    });
});
