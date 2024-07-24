import { createSlice } from '@reduxjs/toolkit';
import { AnimalBody, PageInfo, ResponseBody } from '../types';
import { initPageInfo } from '../../utils/hooks/constants';

export interface AnimalsState {
    searchQuery: string;
    currentCardDetail: AnimalBody | null;
    animals: AnimalBody[];
    pageInfo: PageInfo;
}

export const initialAnimalsState: AnimalsState = {
    searchQuery: '',
    currentCardDetail: null,
    animals: [],
    pageInfo: initPageInfo,
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
    },
});

export const { updateSearchQuery, updateAnimals, updateCurrentCardDetail } = animalsSlice.actions;

export default animalsSlice.reducer;
