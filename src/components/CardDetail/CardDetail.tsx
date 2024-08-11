import { useContext } from 'react';
import { useNavigate, useNavigation, useSearchParams } from '@remix-run/react';
import { getFieldStatus } from '../../utils/constants';
import { AnimalResponse } from '../../services/types';
import { ThemeContext } from '../../utils/ThemeProvider';
import './cardDetail.css';
import Loader from '../Loader/Loader';

export default function CardDetail({ cardInfo }: { cardInfo: AnimalResponse }) {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('searchQuery') || '';
    const pageId = searchParams.get('page') || '0';
    const navigate = useNavigate();
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);

    const clickCloseHandler = () => {
        navigate(`/?page=${pageId}&searchQuery=${searchQuery}`);
    };

    if (navigation.state === 'loading') {
        return <Loader />;
    }

    if (cardInfo.animal) {
        const { name, earthAnimal, earthInsect, avian, canine, feline } = cardInfo.animal;
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
