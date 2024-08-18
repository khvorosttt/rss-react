import { FormsInfo } from '../../sevices/features/formsSlice';
import './card.css';

export interface CardProps {
    form: FormsInfo;
    last: boolean;
}

export function Card(formInfo: { formInfo: CardProps }) {
    return (
        <div className={`card ${formInfo.formInfo.last ? 'last' : ''}`}>
            <img src={`${formInfo.formInfo.form.image}`} />
            <p>{formInfo.formInfo.form.name}</p>
            <p>{formInfo.formInfo.form.age}</p>
            <p>{formInfo.formInfo.form.gender}</p>
            <p>{formInfo.formInfo.form.country}</p>
            <p>{formInfo.formInfo.form.email}</p>
            <p>{formInfo.formInfo.form.password}</p>
        </div>
    );
}
