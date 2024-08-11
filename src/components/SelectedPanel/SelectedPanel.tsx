import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { unselectAll } from '../../services/features/animalsSlice';
import { AnimalBody } from '../../services/types';
import { RootState } from '../../store/store';
import { ThemeContext } from '../../utils/ThemeProvider';
import './selectedPanel.css';

export default function SelectedPanel() {
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const selectedAnimals: AnimalBody[] = useSelector((state: RootState) => state.animals.selectedAnimals);

    const unselectedAllClickHandler = () => {
        dispatch(unselectAll());
    };

    const covertToCSVFormat = () => {
        const rows: string[] = [];
        if (selectedAnimals.length > 0 && selectedAnimals[0] !== null) {
            rows.push(Object.keys(selectedAnimals[0]).join(';'));
            selectedAnimals.forEach((animal) => {
                rows.push(Object.values(animal).join(';'));
            });
            const csv: string = rows.join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8,' });
            const objUrl = URL.createObjectURL(blob);
            return objUrl;
        }
    };

    if (!selectedAnimals.length) {
        return null;
    }

    return (
        <div className={`selected-panel ${theme}-panel`}>
            <p>{selectedAnimals.length} items are selected</p>
            <div className="selected-panel-button">
                <button className={`unselect-button ${theme}-button`} type="button" onClick={unselectedAllClickHandler}>
                    Unselect all
                </button>
                <a
                    className={`dowload-button ${theme}-button`}
                    href={covertToCSVFormat()}
                    download={`${selectedAnimals.length}_animals.csv`}
                >
                    Download
                </a>
            </div>
        </div>
    );
}
