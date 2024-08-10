import { ResponseBody } from '../../services/types';
import Card from '../Card/Card';
import { ThemeContext } from '../../utils/ThemeProvider';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoading } from '../../services/features/animalsSlice';
import { RootState } from '../../store/store';
import Loader from '../Loader/Loader';

export default function ResultSection({ info }: { info: ResponseBody }) {
    const { animals, page } = info;
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.animals.isLoading);

    useEffect(() => {
        if (info) {
            dispatch(updateLoading(false));
        }
    }, [dispatch, info]);

    if (isLoading) {
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
