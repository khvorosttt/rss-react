import { useState } from 'react';
import { ThemeVariant } from '../../utils/ThemeProvider';

interface ErrorButtonProps {
    theme: ThemeVariant;
}

export default function ErrorButton({ theme }: ErrorButtonProps) {
    const [hasError, setHasError] = useState(false);
    const handleClick = () => {
        setHasError(true);
    };
    if (hasError) {
        throw new Error('The error eject button was pressed');
    }
    return (
        <button className={`error-button ${theme}-button`} type="button" onClick={handleClick}>
            Throw error
        </button>
    );
}
