import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import { AnimalBody } from '../../services/api/Api';
import Loader from '../Loader/Loader';
import './cardDetail.css';

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
                    <p>Earth Animal: {earthAnimal ? 'yes' : 'no'}</p>
                    <p>Earth Insect: {earthInsect ? 'yes' : 'no'}</p>
                    <p>Avian: {avian ? 'yes' : 'no'}</p>
                    <p>Canine: {canine ? 'yes' : 'no'}</p>
                    <p>Feline: {feline ? 'yes' : 'no'}</p>
                </div>
                <button type="button" className="button-close" onClick={clickCloseHandler}>
                    Close
                </button>
            </div>
        </Loader>
    );
}
