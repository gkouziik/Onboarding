import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import { countriesApi } from '@/services/api/countries';
import { visitedReducer } from '@/store/slices/visited';
import { settingsReducer } from '@/store/slices/settings';

const rootReducer = combineReducers({
  [countriesApi.reducerPath]: countriesApi.reducer,
  visited: visitedReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

/**
 * What survives an app restart. The RTK Query cache is NOT persisted:
 * it refetches on start, and stale server data on disk would only cause bugs.
 */
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['visited', 'settings'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const PERSIST_ACTIONS = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(countriesApi.middleware),
  });
}

/** App store: persisted to AsyncStorage. */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: PERSIST_ACTIONS },
    }).concat(countriesApi.middleware),
});

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
