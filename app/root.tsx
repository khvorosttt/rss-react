import { Provider } from 'react-redux';
import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import store from '../src/store/store';
import ThemeProvider from '../src/utils/ThemeProvider';
import AppBackground from '../src/components/AppBackground/appBackground';
import '../src/styles/index.css';
import '../src/styles/app.css';

export default function Root() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <Provider store={store}>
                    <ThemeProvider>
                        <AppBackground>
                            <Outlet />
                        </AppBackground>
                    </ThemeProvider>
                </Provider>
                <Scripts />
            </body>
        </html>
    );
}
