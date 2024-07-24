import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent } from 'react';
import { AnimalBody } from '../../services/types';
import './card.css';
import { addSelectedCard, removeSelectedCard } from '../../services/features/animalsSlice';
import { RootState } from '../../app/store';

interface CardProps {
    animal: AnimalBody;
    pageId: string | undefined;
}
export default function Card({ animal, pageId }: CardProps) {
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
        <div className="card">
            <input type="checkbox" onChange={(event) => checkCardHandler(event)} checked={isSelected()} />
            <div className="card-shot-info">{animal.name}</div>
            <NavLink to={`/page/${pageId}/?detail=${animal.uid}`}>Show Details</NavLink>
        </div>
    );
}
