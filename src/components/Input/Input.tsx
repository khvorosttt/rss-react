import { ChangeEvent, PureComponent, ReactNode } from 'react';

interface InputProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default class Input extends PureComponent<InputProps> {
    render(): ReactNode {
        const { onChange } = this.props;
        return <input type="text" placeholder="Enter the name of the animal" onChange={onChange} />;
    }
}
