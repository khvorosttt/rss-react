import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'main',
                element: <div>Main</div>,
            },
            {
                path: 'controlled',
                element: <div>Controlled</div>,
            },
            {
                path: 'uncontrolled',
                element: <div>Uncontrolled</div>,
            },
        ],
    },
]);

export default router;
