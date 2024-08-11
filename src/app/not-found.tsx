import BackButton from './not-found-back-button';

export default function NotFoundPage() {
    return (
        <div className="not-found-page">
            <p>Oops... The page corresponding to this address was not found.</p>
            <BackButton />
        </div>
    );
}
