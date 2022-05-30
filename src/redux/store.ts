import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootReducer';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState: {},
});

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
