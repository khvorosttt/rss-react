import { PureComponent, ReactNode } from 'react';

export default class ErrorButton extends PureComponent<Record<string, never>, { hasError: boolean }> {
    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    handleClick = () => {
        this.setState({
            hasError: true,
        });
    };

    render(): ReactNode {
        const { hasError } = this.state;
        if (hasError) {
            throw new Error('The error eject button was pressed');
        }
        return (
            <button className="error-button" type="button" onClick={this.handleClick}>
                Throw error
            </button>
        );
    }
}
