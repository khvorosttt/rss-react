import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { AnimalBody } from '../../services/types';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import './resultSection.css';
import { useGetAnimalsByNameMutation } from '../../services/api/animalsApi';
import { RootState } from '../../app/store';

export default function ResultSection() {
    const { pageId } = useParams<{ pageId: string }>();
    const [, { isLoading, isError }] = useGetAnimalsByNameMutation();
    const animals: AnimalBody[] = useSelector((state: RootState) => state.animals.animals);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error loading animal data</div>;
    }

    return (
        <div className="result-section">
            {animals && animals.length !== 0
                ? animals.map((value) => {
                      return <Card key={value.uid} animal={value} pageId={pageId} />;
                  })
                : 'No results were found for your request'}
        </div>
    );
}
