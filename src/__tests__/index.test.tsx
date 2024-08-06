import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithProviders from './renderWithProviders';
import SearchPage, { getServerSideProps } from '../pages/index';
import { Mock } from 'vitest';
import { testAnimals, testResponseBody } from './data';
import { getAnimal } from '../services/api/animalsApi';
import { ThemeContext, ThemeVariant } from '../utils/ThemeProvider';
import ThemeButton from '../components/ThemeButton/ThemeButton';

vi.mock('../pages/index', () => ({
    getServerSideProps: vi.fn(),
    default: vi.fn(),
}));

vi.mock('../services/api/animalsApi', () => ({
    getAnimalsByName: vi.fn(),
    getAnimal: vi.fn(),
}));

describe('test SearchPage component', () => {
    const mockServerSideProps = {
        props: {
            info: {
                data: testResponseBody,
                detail: testAnimals[0],
                searchQuery: 'test',
            },
        },
    };
    const mockSetTheme = vi.fn();

    beforeEach(() => {
        (getServerSideProps as Mock).mockReturnValue(Promise.resolve(mockServerSideProps));
        (getAnimal as Mock).mockResolvedValue(testAnimals[0]);
        vi.clearAllMocks();
    });

    it('should change text in theme button', async () => {
        renderWithProviders(<SearchPage info={mockServerSideProps.props.info} />);
        waitFor(async () => {
            const themeButton = screen.getByText('☼');
            expect(themeButton).toHaveClass('button-theme light-button');
            await userEvent.click(themeButton);
            expect(screen.getByText('☽')).toBeInTheDocument();
            expect(themeButton).toHaveClass('button-theme dark-button');
        });
    });

    it('should display CardDetail', async () => {
        renderWithProviders(<SearchPage info={mockServerSideProps.props.info} />);
        waitFor(() => {
            expect(screen.getByText(/Close/i)).toBeInTheDocument();
        });
    });

    it('changes theme from light to dark when clicked', async () => {
        renderWithProviders(
            <ThemeContext.Provider value={{ theme: ThemeVariant.light, setTheme: mockSetTheme }}>
                <ThemeButton />
            </ThemeContext.Provider>
        );
        const themeButton = screen.getByText('☼');
        await userEvent.click(themeButton);
        expect(mockSetTheme).toHaveBeenCalledWith(ThemeVariant.dark);
    });

    it('changes theme from dark to light when clicked', async () => {
        renderWithProviders(
            <ThemeContext.Provider value={{ theme: ThemeVariant.dark, setTheme: mockSetTheme }}>
                <ThemeButton />
            </ThemeContext.Provider>
        );
        const themeButton = screen.getByText('☽');
        await userEvent.click(themeButton);
        expect(mockSetTheme).toHaveBeenCalledWith(ThemeVariant.light);
    });
});
