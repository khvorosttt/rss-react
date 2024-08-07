'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function BackButton() {
    const router = useRouter();
    const searchQuery: string = useSelector((state: RootState) => state.animals.searchQuery);

    return (
        <button type="button" onClick={() => router.push(`/?page=0&searchQuery=${searchQuery}`)}>
            Back to animals list
        </button>
    );
}
