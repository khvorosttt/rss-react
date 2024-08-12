import { Provider } from 'react-redux';
import ErrorBounder from '../components/ErrorBounder/ErrorBounder';
import store from '../store/store';
import ThemeProvider from '../utils/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBounder>
            <Provider store={store}>
                <ThemeProvider>{children}</ThemeProvider>
            </Provider>
        </ErrorBounder>
    );
}
