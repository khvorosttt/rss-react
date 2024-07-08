import { ChangeEvent, PureComponent, ReactNode } from 'react';

interface InputProps {
    searchQuery: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default class Input extends PureComponent<InputProps> {
    render(): ReactNode {
        const { searchQuery } = this.props;
        const { onChange } = this.props;
        return <input value={searchQuery} type="text" placeholder="Enter the name of the animal" onChange={onChange} />;
    }
}
