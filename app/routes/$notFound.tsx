import { useNavigate } from '@remix-run/react';
import '../../src/styles/notFoundPage.css';

export default function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div className="not-found-page">
            <p>Oops... The page corresponding to this address was not found.</p>
            <button type="button" onClick={() => navigate(`/?page=0&searchQuery=`)}>
                Back to animals list
            </button>
        </div>
    );
}
