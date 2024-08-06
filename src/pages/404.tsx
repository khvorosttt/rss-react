import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AppBackground from '../components/AppBackground/appBackground';

export default function NotFoundPage() {
    const router = useRouter();
    const searchQuery: string = useSelector((state: RootState) => state.animals.searchQuery);

    return (
        <AppBackground>
            <div className="not-found-page">
                <p>Oops... The page corresponding to this address was not found.</p>
                <button type="button" onClick={() => router.push(`/?page=0&searchQuery=${searchQuery}`)}>
                    Back to animals list
                </button>
            </div>
        </AppBackground>
    );
}
