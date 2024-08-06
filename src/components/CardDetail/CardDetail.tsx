import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { getFieldStatus } from '../../utils/constants';
import { updateCurrentCardDetail } from '../../services/features/animalsSlice';
import { RootState } from '../../store/store';
import { AnimalBody } from '../../services/types';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { ThemeContext } from '../../utils/ThemeProvider';

export default function CardDetail() {
    const searchParams = useSearchParams();
    console.log(searchParams);
    const pageId = searchParams.get('page') || '0';
    const router = useRouter();
    const dispatch = useDispatch();
    const searchQuery: string = useSelector((state: RootState) => state.animals.searchQuery);
    const currentCardDetail: AnimalBody | null = useSelector((state: RootState) => state.animals.currentCardDetail);
    const { theme } = useContext(ThemeContext);

    const clickCloseHandler = () => {
        dispatch(updateCurrentCardDetail(null));
        router.push(`/?page=${pageId}&searchQuery=${searchQuery}`);
    };

    if (currentCardDetail) {
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
