import { useContext, useEffect } from 'react';
import { getFieldStatus } from '../../utils/constants';
import { AnimalBody } from '../../services/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeContext } from '../../utils/ThemeProvider';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { updateDetailLoading } from '../../services/features/animalsSlice';

export interface CardDetailProps {
    searchQuery: string;
    currentCardDetail: AnimalBody | undefined;
}

export default function CardDetail({ cardInfo }: { cardInfo: CardDetailProps }) {
    const searchParams = useSearchParams();
    const pageId = searchParams!.get('page') || '0';
    const router = useRouter();
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.animals.detailLoading);

    useEffect(() => {
        if (cardInfo) {
            dispatch(updateDetailLoading(false));
        }
    }, [dispatch, cardInfo]);

    if (isLoading) {
        return <Loader />;
    }

    const clickCloseHandler = () => {
        router.push(`/?page=${pageId}&searchQuery=${cardInfo.searchQuery}`);
    };

    if (cardInfo.currentCardDetail) {
        const { name, earthAnimal, earthInsect, avian, canine, feline } = cardInfo.currentCardDetail;
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
