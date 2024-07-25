import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import Loader from '../Loader/Loader';
import './cardDetail.css';
import { getFieldStatus, SearchParams, ThemeContext, ThemeVariant } from '../../utils/constants';
import { useGetAnimalByIdQuery } from '../../services/api/animalsApi';
import { updateCurrentCardDetail } from '../../services/features/animalsSlice';
import { RootState } from '../../store/store';
import { AnimalBody } from '../../services/types';

export default function CardDetail() {
    const { pageId } = useParams<{ pageId: string }>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const detailId = searchParams.get(SearchParams.detail);
    const { data, isLoading, isError } = useGetAnimalByIdQuery(detailId!);
    const dispatch = useDispatch();
    const currentCardDetail: AnimalBody | null = useSelector((state: RootState) => state.animals.currentCardDetail);
    const theme: ThemeVariant = useContext(ThemeContext);

    useEffect(() => {
        if (!isLoading && data) {
            dispatch(updateCurrentCardDetail(data.animal));
        }
    }, [data, isLoading, dispatch]);

    useEffect(() => {
        if (detailId && data) {
            dispatch(updateCurrentCardDetail(data.animal));
        }
    }, [detailId, data, dispatch]);

    const clickCloseHandler = () => {
        dispatch(updateCurrentCardDetail(null));
        navigate(`/page/${pageId}`);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error loading animal data</div>;
    }

    if (currentCardDetail !== null) {
        const { name, earthAnimal, earthInsect, avian, canine, feline } = currentCardDetail;
        return (
            <div className={`detail-container ${theme}-card`}>
                <div className="card-detail">
                    <h3>Animal</h3>
                    <p>Name: {name}</p>
                    <p>Earth Animal: {getFieldStatus(earthAnimal)}</p>
                    <p>Earth Insect: {getFieldStatus(earthInsect)}</p>
                    <p>Avian: {getFieldStatus(avian)}</p>
                    <p>Canine: {getFieldStatus(canine)}</p>
                    <p>Feline: {getFieldStatus(feline)}</p>
                </div>
                <button type="button" className={`button-close ${theme}-button`} onClick={clickCloseHandler}>
                    Close
                </button>
            </div>
        );
    }
}
