import { PureComponent, ReactNode } from 'react';
import { AnimalBody } from '../../services/api/Api';
import Loader from '../Loader/Loader';

export interface ResultProps {
    isLoading: boolean;
    result: AnimalBody[];
}

export default class ResultSection extends PureComponent<ResultProps> {
    render(): ReactNode {
        const { result, isLoading } = this.props;
        return (
            <Loader isLoading={isLoading}>
                <div className="result-section">
                    {result.map((value) => {
                        return <div key={value.uid}>{value.name}</div>;
                    })}
                </div>
            </Loader>
        );
    }
}
