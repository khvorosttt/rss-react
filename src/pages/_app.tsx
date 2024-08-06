import type { AppProps } from 'next/app';
import RootLayout from './layout';
import '../style/index.css';
import '../style/style.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
    );
}
