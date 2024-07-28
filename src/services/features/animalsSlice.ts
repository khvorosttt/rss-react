import { createSlice } from '@reduxjs/toolkit';
import { AnimalBody, PageInfo, ResponseBody } from '../types';
import { initPageInfo } from '../../utils/constants';

export interface AnimalsState {
    searchQuery: string;
    currentCardDetail: AnimalBody | null;
    animals: AnimalBody[];
    pageInfo: PageInfo;
    selectedAnimals: AnimalBody[];
}

export const initialAnimalsState: AnimalsState = {
    searchQuery: '',
    currentCardDetail: null,
    animals: [],
    pageInfo: initPageInfo,
    selectedAnimals: [],
};

export const animalsSlice = createSlice({
    name: 'animals',
    initialState: initialAnimalsState,
    reducers: {
        updateSearchQuery(state, action) {
            return { ...state, searchQuery: action.payload };
        },
        updateAnimals(state, { payload }: { payload: ResponseBody }) {
            return { ...state, animals: payload.animals, pageInfo: payload.page };
        },
        updateCurrentCardDetail(state, action) {
            return { ...state, currentCardDetail: action.payload };
        },
        removeSelectedCard(state, action) {
            const findIndex: number = state.selectedAnimals.findIndex((value) => value.uid === action.payload);
            if (findIndex !== -1) {
                state.selectedAnimals.splice(findIndex, 1);
            }
        },
        addSelectedCard(state, { payload }: { payload: AnimalBody }) {
            state.selectedAnimals.push(payload);
        },
        unselectAll(state) {
            return { ...state, selectedAnimals: [] };
        },
    },
});

export const {
    updateSearchQuery,
    updateAnimals,
    updateCurrentCardDetail,
    removeSelectedCard,
    addSelectedCard,
    unselectAll,
} = animalsSlice.actions;

export default animalsSlice.reducer;
