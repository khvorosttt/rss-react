'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
    const router = useRouter();

    return (
        <button type="button" onClick={() => router.push(`/?page=0&searchQuery=`)}>
            Back to animals list
        </button>
    );
}
