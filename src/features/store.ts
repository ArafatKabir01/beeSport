import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authSlice from './auth/authSlice';
import fixtureSlice from './front-end/fixture/fixtureSlice';
import langSlice from './lang/langSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authSlice: authSlice.reducer,
    langSlice: langSlice.reducer,
    fixtureSlice: fixtureSlice.reducer,
  },
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
