import { combineReducers, configureStore } from '@reduxjs/toolkit';

import animalsReducer from '../../services/features/animalsSlice';

const rootReducer = combineReducers({
    animals: animalsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
