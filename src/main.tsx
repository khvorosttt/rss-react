import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorBounder from './components/ErrorBounder/ErrorBounder';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBounder>
            <App />
        </ErrorBounder>
    </React.StrictMode>
);
