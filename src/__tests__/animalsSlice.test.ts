import reducer, {
    addSelectedCard,
    initialAnimalsState,
    removeSelectedCard,
    unselectAll,
    updateAnimals,
    updateCurrentCardDetail,
    updateSearchQuery,
} from '../services/features/animalsSlice';
import { testAnimals, testPageInfo } from './data';

describe('test animal scice', () => {
    it('should update searchQuery', () => {
        expect(reducer(initialAnimalsState, updateSearchQuery('test'))).toEqual({
            ...initialAnimalsState,
            searchQuery: 'test',
        });
    });

    it('should update animals', () => {
        expect(reducer(initialAnimalsState, updateAnimals({ animals: testAnimals, page: testPageInfo }))).toEqual({
            ...initialAnimalsState,
            animals: testAnimals,
            pageInfo: testPageInfo,
        });
    });

    it('should update current card detail', () => {
        expect(reducer(initialAnimalsState, updateCurrentCardDetail(testAnimals[0]))).toEqual({
            ...initialAnimalsState,
            currentCardDetail: testAnimals[0],
        });
    });

    it('should add select card', () => {
        expect(reducer(initialAnimalsState, addSelectedCard(testAnimals[0]))).toEqual({
            ...initialAnimalsState,
            selectedAnimals: testAnimals.slice(0, 1),
        });
    });

    it('should remove select card', () => {
        expect(reducer({ ...initialAnimalsState, selectedAnimals: testAnimals }, removeSelectedCard('1'))).toEqual({
            ...initialAnimalsState,
            selectedAnimals: testAnimals.slice(1),
        });
    });

    it('should unselect all cards', () => {
        expect(reducer({ ...initialAnimalsState, selectedAnimals: testAnimals }, unselectAll())).toEqual({
            ...initialAnimalsState,
            selectedAnimals: [],
        });
    });
});
