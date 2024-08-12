import { useContext } from 'react';
import { ThemeContext } from '../../utils/ThemeProvider';
import ThemeButton from '../ThemeButton/ThemeButton';

export default function AppBackground({ children }: { children: React.ReactNode }) {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`app-background ${theme}`}>
            <ThemeButton />
            {children}
        </div>
    );
}
