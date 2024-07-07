import { PureComponent, ReactNode } from 'react';
import { AnimalBody } from '../../services/api/Api';

export interface ResultProps {
    result: AnimalBody[];
}

export default class ResultSection extends PureComponent<ResultProps> {
    render(): ReactNode {
        const { result } = this.props;
        return (
            <div className="result-section">
                {result.map((value) => {
                    return <div key={value.uid}>{value.name}</div>;
                })}
            </div>
        );
    }
}
