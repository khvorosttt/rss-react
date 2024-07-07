import { Component, ReactNode } from 'react';

export default class ErrorBounder extends Component<{ children: ReactNode }, { hasError: boolean; errorInfo: string }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = {
            hasError: false,
            errorInfo: '',
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        this.setState({ errorInfo: error.toString() });
    }

    render(): ReactNode {
        const { children } = this.props;
        const { hasError, errorInfo } = this.state;
        if (hasError) {
            return <div>An error occurred in the application. {errorInfo}</div>;
        }
        return children;
    }
}
