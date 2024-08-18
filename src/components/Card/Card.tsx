import { FormsInfo } from '../../sevices/features/formsSlice';
import './card.css';

export function Card(data: { data: FormsInfo }, last?: boolean) {
    return (
        <div className={`card ${last ? 'last' : ''}`}>
            <img src={`${data.data.image}`} />
            <p>{data.data.name}</p>
            <p>{data.data.age}</p>
            <p>{data.data.gender}</p>
            <p>{data.data.country}</p>
            <p>{data.data.email}</p>
            <p>{data.data.password}</p>
        </div>
    );
}
