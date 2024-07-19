import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import { AnimalBody } from '../../services/api/Api';
import Loader from '../Loader/Loader';
import './cardDetail.css';
import { getFieldStatus } from '../../utils/hooks/constants';

export default function CardDetail() {
    const { animal } = useLoaderData() as { animal: AnimalBody };
    const { name, earthAnimal, earthInsect, avian, canine, feline } = animal;
    const [isLoading, setIsLoading] = useState(true);
    const { pageId } = useParams<{ pageId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (animal) {
            setIsLoading(false);
        }
    }, [animal]);

    const clickCloseHandler = () => {
        navigate(`/page/${pageId}`);
    };

    return (
        <Loader isLoading={isLoading}>
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
        </Loader>
    );
}
