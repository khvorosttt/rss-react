import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { AnimalBody } from '../../services/types';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import './resultSection.css';
import { useGetAnimalsByNameMutation } from '../../services/api/animalsApi';

export interface ResultProps {
    isLoading: boolean;
    result: AnimalBody[];
}

export default function ResultSection() {
    const { pageId } = useParams<{ pageId: string }>();
    const navigate = useNavigate();
    const [getAnimalsByName, { data: animals, isLoading, isError }] = useGetAnimalsByNameMutation();

    useEffect(() => {
        getAnimalsByName({ name: localStorage.getItem('savedSearch') || '', pageNumber: Number(pageId) });
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error loading animal data</div>;
    }

    return (
        <div
            className="result-section"
            onClick={() => navigate(`/page/${pageId}`)}
            onKeyDown={() => navigate(`/page/${pageId}`)}
            role="button"
            tabIndex={0}
        >
            {animals?.animals.length !== 0
                ? animals?.animals.map((value) => {
                      return <Card key={value.uid} animal={value} pageId={pageId} />;
                  })
                : 'No results were found for your request'}
        </div>
    );
}
