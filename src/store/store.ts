import { configureStore } from '@reduxjs/toolkit';
import animalsReducer from '../services/features/animalsSlice';

const store = configureStore({
    reducer: {
        animals: animalsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
