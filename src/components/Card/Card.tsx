import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AnimalBody } from '../../services/types';
import './card.css';
import { updateCurrentCardDetail } from '../../services/features/animalsSlice';

interface CardProps {
    animal: AnimalBody;
    pageId: string | undefined;
}
export default function Card({ animal, pageId }: CardProps) {
    const dispatch = useDispatch();

    const stopPropagationHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.stopPropagation();
        dispatch(updateCurrentCardDetail(animal));
    };

    return (
        <NavLink to={`/page/${pageId}/?detail=${animal.uid}`} onClick={(event) => stopPropagationHandler(event)}>
            <div className="card">{animal.name}</div>
        </NavLink>
    );
}
