import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import ControlledForm from '../Forms/controlled';
import { FormsInfoList } from '../FormsInfoList/FormsInfoList';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'main',
                element: <FormsInfoList />,
            },
            {
                path: 'controlled',
                element: <ControlledForm />,
            },
            {
                path: 'uncontrolled',
                element: <div>Uncontrolled</div>,
            },
        ],
    },
]);

export default router;
