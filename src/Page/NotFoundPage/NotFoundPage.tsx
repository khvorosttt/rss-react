import { useNavigate } from 'react-router';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div>
            <p>Oops... The page corresponding to this address was not found.</p>
            <button type="button" onClick={() => navigate('/page/0')}>
                Back to animals list
            </button>
        </div>
    );
}
