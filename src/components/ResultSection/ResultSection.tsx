import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { AnimalBody } from '../../services/types';
import Card from '../Card/Card';
import { RootState } from '../../store/store';
import { useSearchParams } from 'next/navigation';
import { ThemeContext } from '../../utils/ThemeProvider';

export default function ResultSection() {
    const searchParams = useSearchParams();
    const pageId = searchParams.get('page') || '0';
    const animals: AnimalBody[] = useSelector((state: RootState) => state.animals.animals);
    const { theme } = useContext(ThemeContext);

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
