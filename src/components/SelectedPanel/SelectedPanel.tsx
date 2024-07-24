import { useDispatch } from 'react-redux';
import { unselectAll } from '../../services/features/animalsSlice';
import { AnimalBody } from '../../services/types';
import './selectedPanel.css';

interface SelectedPanelProps {
    selectedAnimals: AnimalBody[];
}

export default function SelectedPanel({ selectedAnimals }: SelectedPanelProps) {
    const dispatch = useDispatch();

    const unselectedAllClickHandler = () => {
        dispatch(unselectAll());
    };

    const covertToCSVFormat = () => {
        const rows: string[] = [];
        rows.push(Object.keys(selectedAnimals[0]).join(';'));
        selectedAnimals.forEach((animal) => {
            rows.push(Object.values(animal).join(';'));
        });
        const csv: string = rows.join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8,' });
        const objUrl = URL.createObjectURL(blob);
        return objUrl;
    };

    return (
        <div className="selected-panel">
            <p>{selectedAnimals.length} items are selected</p>
            <div className="selected-panel-button">
                <button className="unselect-button" type="button" onClick={unselectedAllClickHandler}>
                    Unselect all
                </button>
                <a
                    className="dowload-button"
                    href={covertToCSVFormat()}
                    download={`${selectedAnimals.length}_animals.csv`}
                >
                    Download
                </a>
            </div>
        </div>
    );
}
