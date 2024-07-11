import { PureComponent, ReactNode } from 'react';
import './loader.css';

interface LoaderInfo {
    isLoading: boolean;
    children: ReactNode;
}

export default class Loader extends PureComponent<LoaderInfo> {
    render(): ReactNode {
        const { isLoading, children } = this.props;
        if (isLoading) {
            return <div className="loader" />;
        }
        return children;
    }
}
