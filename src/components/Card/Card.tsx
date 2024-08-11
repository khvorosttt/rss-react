import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from '@remix-run/react';
import { ChangeEvent } from 'react';
import { AnimalBody } from '../../services/types';
import './card.css';
import { addSelectedCard, removeSelectedCard } from '../../services/features/animalsSlice';
import { RootState } from '../../store/store';

interface CardProps {
    animal: AnimalBody;
    pageId: string | undefined;
    theme: string;
}
export default function Card({ animal, pageId, theme }: CardProps) {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('searchQuery') || '';
    const dispatch = useDispatch();
    const selectedCards: AnimalBody[] = useSelector((state: RootState) => state.animals.selectedAnimals);

    const isSelected = () => {
        return selectedCards.findIndex((value) => value.uid === animal.uid) !== -1;
    };

    const checkCardHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        const checkbox: HTMLInputElement = event.currentTarget;
        if (isSelected()) {
            dispatch(removeSelectedCard(animal.uid));
            checkbox.checked = false;
        } else {
            dispatch(addSelectedCard(animal));
            checkbox.checked = true;
        }
    };

    return (
        <div className={`card ${theme}-card`}>
            <input
                className={`${theme}-checkbox`}
                type="checkbox"
                onChange={(event) => checkCardHandler(event)}
                checked={isSelected()}
            />
            <div className="card-shot-info">{animal.name}</div>
            <Link
                className={`details-button ${theme}-button`}
                to={`/?page=${pageId}&searchQuery=${searchQuery}&detail=${animal.uid}`}
            >
                Show Details
            </Link>
        </div>
    );
}
