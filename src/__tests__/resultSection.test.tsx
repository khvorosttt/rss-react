import { BrowserRouter } from 'react-router-dom';
import { waitFor, screen } from '@testing-library/react';
import ResultSection from '../components/ResultSection/ResultSection';
import renderWithProviders from './renderWithProviders';
import { elementsOnPage, ResponseBody } from '../services/types';
import { testAnimals, testPageInfo } from './data';
import { Mock } from 'vitest';
import { useNavigation } from '@remix-run/react';

vi.mock('react-router', () => ({
    useParams: () => ({ pageId: '1' }),
    useSelector: vi.fn(),
}));

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
                return '';
            },
        },
    ],
    useNavigation: vi.fn(),
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
}));

describe('test result section', () => {
    const mockNavigation = {
        state: 'submitting',
    };
    const mockLoadingNavigation = {
        state: 'loading',
    };

    it(`should display ${elementsOnPage} on page`, async () => {
        (useNavigation as Mock).mockReturnValue(mockNavigation);
        const info: ResponseBody = {
            animals: testAnimals.slice(0, elementsOnPage),
            page: testPageInfo,
        };
        renderWithProviders(
            <BrowserRouter>
                <ResultSection info={info} />
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.getAllByRole('link').length).toBe(elementsOnPage);
        });
    });

    it(`should display empty message`, async () => {
        (useNavigation as Mock).mockReturnValue(mockNavigation);
        const info: ResponseBody = {
            animals: [],
            page: testPageInfo,
        };
        renderWithProviders(
            <BrowserRouter>
                <ResultSection info={info} />
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.getByText(/No results were found for your request/i)).toBeInTheDocument();
        });
    });

    it('should display loader', async () => {
        (useNavigation as Mock).mockReturnValue(mockLoadingNavigation);
        const info: ResponseBody = {
            animals: testAnimals.slice(0, elementsOnPage),
            page: testPageInfo,
        };
        renderWithProviders(
            <BrowserRouter>
                <ResultSection info={info} />
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.getByRole('status')).toBeInTheDocument();
        });
    });
});
