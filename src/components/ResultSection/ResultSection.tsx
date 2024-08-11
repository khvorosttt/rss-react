import { useContext } from 'react';
import { ResponseBody } from '../../services/types';
import Card from '../Card/Card';
import { ThemeContext } from '../../utils/ThemeProvider';
import './resultSection.css';
import { useNavigation, useSearchParams } from '@remix-run/react';
import Loader from '../Loader/Loader';

export default function ResultSection({ info }: { info: ResponseBody }) {
    const { animals, page } = info;
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation();
    const [searchParams] = useSearchParams();
    const detail = searchParams.get('detail') || '';

    if (navigation.state === 'loading' && !detail) {
        return <Loader />;
    }

    return (
        <div className="result-section">
            {animals.length !== 0
                ? animals.map((value) => {
                      return (
                          <Card key={value.uid} animal={value} pageId={page.pageNumber.toString()} theme={`${theme}`} />
                      );
                  })
                : 'No results were found for your request'}
        </div>
    );
}
