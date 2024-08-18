import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './formsInfoList.css';
import { Card } from '../Card/Card';

export function FormsInfoList() {
    const forms = useSelector((state: RootState) => state.forms.formsData);
    return (
        <div className="forms-info-list">
            {forms.map((form, index) => {
                return <Card key={index} data={form} />;
            })}
        </div>
    );
}
