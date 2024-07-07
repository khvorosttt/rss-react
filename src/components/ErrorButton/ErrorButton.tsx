import { Component, ReactNode } from 'react';

export default class ErrorButton extends Component {
    static handleClick() {
        throw new Error('Error button pressed');
    }

    render(): ReactNode {
        return (
            <button className="error-button" type="button" onClick={ErrorButton.handleClick}>
                Throw error
            </button>
        );
    }
}
