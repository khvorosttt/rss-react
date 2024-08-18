import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './formsInfoList.css';
import { Card, CardProps } from '../Card/Card';

export function FormsInfoList() {
    const forms = useSelector((state: RootState) => state.forms.formsData);
    const reversedForms = [...forms].reverse();
    return (
        <div className="forms-info-list">
            {reversedForms.map((form, index) => {
                const formInfo: CardProps = {
                    form,
                    last: index === 0,
                };
                return <Card key={index} formInfo={formInfo} />;
            })}
        </div>
    );
}
