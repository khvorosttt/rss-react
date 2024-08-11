import { useContext } from 'react';
import { ResponseBody } from '../../services/types';
import Card from '../Card/Card';
import { ThemeContext } from '../../utils/ThemeProvider';
import './resultSection.css';

export default function ResultSection({ info }: { info: ResponseBody }) {
    const { animals, page } = info;
    const { theme } = useContext(ThemeContext);

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
