import { useContext } from 'react';
import './loader.css';
import { ThemeContext } from '../../utils/ThemeProvider';

export default function Loader() {
    const { theme } = useContext(ThemeContext);

    return <div className={`loader ${theme}-loader`} role="status" />;
}
