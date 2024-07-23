import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './cardDetail.css';
import { getFieldStatus, SearchParams } from '../../utils/hooks/constants';
import { useGetAnimalByIdQuery } from '../../services/api/animalsApi';

export default function CardDetail() {
    const { pageId } = useParams<{ pageId: string }>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const detailId = searchParams.get(SearchParams.detail);
    const { data, isFetching, isError, isSuccess } = useGetAnimalByIdQuery(detailId!);

    const clickCloseHandler = () => {
        navigate(`/page/${pageId}`);
    };

    if (isFetching) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error loading animal data</div>;
    }
    if (isSuccess) {
        const { name, earthAnimal, earthInsect, avian, canine, feline } = data.animal;
        return (
            <div className="detail-container">
                <div className="card-detail">
                    <h3>Animal</h3>
                    <p>Name: {name}</p>
                    <p>Earth Animal: {getFieldStatus(earthAnimal)}</p>
                    <p>Earth Insect: {getFieldStatus(earthInsect)}</p>
                    <p>Avian: {getFieldStatus(avian)}</p>
                    <p>Canine: {getFieldStatus(canine)}</p>
                    <p>Feline: {getFieldStatus(feline)}</p>
                </div>
                <button type="button" className="button-close" onClick={clickCloseHandler}>
                    Close
                </button>
            </div>
        );
    }
}
