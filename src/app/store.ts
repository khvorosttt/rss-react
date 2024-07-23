import { configureStore } from '@reduxjs/toolkit';
import { animalsApi } from '../services/api/animalsApi';

export const store = configureStore({
    reducer: {
        [animalsApi.reducerPath]: animalsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animalsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
