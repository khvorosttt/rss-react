import { Metadata } from 'next';
import StoreProvider from './StoreProvider';
import '../style/style.css';
import '../style/index.css';

export const metadata: Metadata = {
    title: 'Animals',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
