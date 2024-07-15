import { ReactNode } from 'react';
import './loader.css';

interface LoaderInfo {
    isLoading: boolean;
    children: ReactNode;
}

export default function Loader({ isLoading, children }: LoaderInfo) {
    if (isLoading) {
        return <div className="loader" />;
    }
    return children;
}
