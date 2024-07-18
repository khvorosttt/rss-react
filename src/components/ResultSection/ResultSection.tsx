import { useNavigate, useParams } from 'react-router';
import { AnimalBody } from '../../services/api/Api';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import './resultSection.css';

export interface ResultProps {
    isLoading: boolean;
    result: AnimalBody[];
}

export default function ResultSection({ isLoading, result }: ResultProps) {
    const { pageId } = useParams<{ pageId: string }>();
    const navigate = useNavigate();

    return (
        <Loader isLoading={isLoading}>
            <div
                className="result-section"
                onClick={() => navigate(`/page/${pageId}`)}
                onKeyDown={() => navigate(`/page/${pageId}`)}
                role="button"
                tabIndex={0}
            >
                {result.length !== 0
                    ? result.map((value) => {
                          return <Card key={value.uid} animal={value} pageId={pageId} />;
                      })
                    : 'No results were found for your request'}
            </div>
        </Loader>
    );
}
