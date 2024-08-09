'use client';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent } from 'react';
import { AnimalBody } from '../../services/types';
import { addSelectedCard, removeSelectedCard } from '../../services/features/animalsSlice';
import { RootState } from '../../store/store';
import { useRouter } from 'next/navigation';

interface CardProps {
    animal: AnimalBody;
    pageId: string | undefined;
    theme: string;
}
export default function Card({ animal, pageId, theme }: CardProps) {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchQuery: string = useSelector((state: RootState) => state.animals.searchQuery);
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

    const showDetailHandler = () => {
        router.push(`/?page=${pageId}&searchQuery=${searchQuery}&detailId=${animal.uid}`);
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
            <button className={`details-button ${theme}-button`} onClick={showDetailHandler}>
                Show Details
            </button>
        </div>
    );
}
