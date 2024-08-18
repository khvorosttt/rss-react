import { Outlet } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/header';

function App() {
    return (
        <>
            <Header />
            <div id="content">
                <Outlet />
            </div>
        </>
    );
}

export default App;
