import { createContext, ReactNode, useMemo, useState } from 'react';

export enum ThemeVariant {
    light = 'light',
    dark = 'dark',
}

export interface ThemeValue {
    theme: ThemeVariant;
    setTheme: React.Dispatch<React.SetStateAction<ThemeVariant>>;
}

export const ThemeContext = createContext<ThemeValue>({ theme: ThemeVariant.light, setTheme: () => {} });

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeVariant>(ThemeVariant.light);
    const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
