import { NavLink } from 'react-router-dom';
import { AnimalBody } from '../../services/types';
import './card.css';

interface CardProps {
    animal: AnimalBody;
    pageId: string | undefined;
}
export default function Card({ animal, pageId }: CardProps) {
    const stopPropagationHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.stopPropagation();
    };

    return (
        <NavLink to={`/page/${pageId}/?detail=${animal.uid}`} onClick={(event) => stopPropagationHandler(event)}>
            <div className="card">{animal.name}</div>
        </NavLink>
    );
}
