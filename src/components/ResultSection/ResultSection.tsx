import { AnimalBody } from '../../services/api/Api';
import Loader from '../Loader/Loader';

export interface ResultProps {
    isLoading: boolean;
    result: AnimalBody[];
}

export default function ResultSection({ isLoading, result }: ResultProps) {
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
