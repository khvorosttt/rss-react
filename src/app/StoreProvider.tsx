'use client';

import { Provider } from 'react-redux';
import ThemeProvider from '../utils/ThemeProvider';
import store from '../store/store';
import AppBackground from '../components/AppBackground/appBackground';
import { Suspense } from 'react';
import Loading from './loading';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <AppBackground>
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                </AppBackground>
            </ThemeProvider>
        </Provider>
    );
}
