import { configureStore } from '@reduxjs/toolkit';
import { animalsApi } from '../services/api/animalsApi';
import animalsReducer from '../services/features/animalsSlice';

export const store = configureStore({
    reducer: {
        [animalsApi.reducerPath]: animalsApi.reducer,
        animals: animalsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animalsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
