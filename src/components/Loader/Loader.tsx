import { useContext } from 'react';
import { ThemeContext, ThemeVariant } from '../../utils/constants';
import './loader.css';

export default function Loader() {
    const theme: ThemeVariant = useContext(ThemeContext);

    return <div className={`loader ${theme}-loader`} role="status" />;
}
