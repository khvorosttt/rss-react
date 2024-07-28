import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { AnimalBody } from '../../services/types';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import './resultSection.css';
import { useGetAnimalsByNameQuery } from '../../services/api/animalsApi';
import { RootState } from '../../store/store';
import { ThemeContext, ThemeVariant } from '../../utils/constants';

export default function ResultSection() {
    const { pageId } = useParams<{ pageId: string }>();
    const searchQuery: string = useSelector((state: RootState) => state.animals.searchQuery);
    const { isFetching, isError } = useGetAnimalsByNameQuery({
        name: searchQuery,
        pageNumber: Number(pageId),
    });
    const animals: AnimalBody[] = useSelector((state: RootState) => state.animals.animals);
    const theme: ThemeVariant = useContext(ThemeContext);

    if (isFetching) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error loading animal data</div>;
    }

    return (
        <div className="result-section">
            {animals && animals.length !== 0
                ? animals.map((value) => {
                      return <Card key={value.uid} animal={value} pageId={pageId} theme={`${theme}`} />;
                  })
                : 'No results were found for your request'}
        </div>
    );
}
