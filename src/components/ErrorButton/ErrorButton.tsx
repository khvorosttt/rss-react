import { useState } from 'react';

export default function ErrorButton() {
    const [hasError, setHasError] = useState(false);
    const handleClick = () => {
        setHasError(true);
    };
    if (hasError) {
        throw new Error('The error eject button was pressed');
    }
    return (
        <button className="error-button" type="button" onClick={handleClick}>
            Throw error
        </button>
    );
}
