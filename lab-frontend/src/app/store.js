import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { reportsApi } from '../services/report';

export const store = configureStore({
    reducer : {
        [reportsApi.reducerPath] : reportsApi.reducer , 
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(reportsApi.middleware)
});
setupListeners(store.dispatch);
