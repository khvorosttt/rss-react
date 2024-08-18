import { configureStore } from '@reduxjs/toolkit';
import FormsSliceReducer from '../sevices/features/formsSlice';

const store = configureStore({
    reducer: {
        forms: FormsSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
