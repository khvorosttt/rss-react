import { createSlice } from '@reduxjs/toolkit';

export interface FormsInfo {
    name: string;
    age: number;
    email: string;
    password: string;
    gender: 'male' | 'female';
    country: string;
    image: string;
}

export interface IControlledState {
    formsData: FormsInfo[];
}

export const initialFormsState: IControlledState = {
    formsData: [],
};

export const FormsSlice = createSlice({
    name: 'controlledForm',
    initialState: initialFormsState,
    reducers: {
        addFormInfo(state, action) {
            state.formsData.push(action.payload);
        },
    },
});

export const { addFormInfo } = FormsSlice.actions;

export default FormsSlice.reducer;
