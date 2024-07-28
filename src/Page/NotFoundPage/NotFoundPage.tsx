import { useNavigate } from 'react-router';
import './notFoundPage.css';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="not-found-page">
            <p>Oops... The page corresponding to this address was not found.</p>
            <button type="button" onClick={() => navigate('/page/0')}>
                Back to animals list
            </button>
        </div>
    );
}
