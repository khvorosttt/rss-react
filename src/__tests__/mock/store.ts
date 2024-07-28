import { combineReducers, configureStore } from '@reduxjs/toolkit';

import animalsReducer from '../../services/features/animalsSlice';
import { animalsApi } from '../../services/api/animalsApi';

const rootReducer = combineReducers({
    [animalsApi.reducerPath]: animalsApi.reducer,
    animals: animalsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animalsApi.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
