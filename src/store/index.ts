import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { countriesApi } from '@/services/api/countries/countriesApi';
import { visitedReducer } from '@/store/slices/visited';

const rootReducer = combineReducers({
  [countriesApi.reducerPath]: countriesApi.reducer,
  visited: visitedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(countriesApi.middleware),
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const store = setupStore();
