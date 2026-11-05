import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
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
import { visitedReducer } from '@/store/visited/slices';
import { settingsReducer } from '@/store/settings/slices';
import { authReducer } from '@/store/auth/slices';
import { rootSaga } from '@/store/rootSaga';

const rootReducer = combineReducers({
  [countriesApi.reducerPath]: countriesApi.reducer,
  visited: visitedReducer,
  auth: authReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

/**
 * What survives an app restart. The RTK Query cache is NOT persisted:
 * it refetches on start, and stale server data on disk would only cause bugs.
 * `auth` is NOT persisted either: Lock state is derived from the keychain on
 * start, so tampering with AsyncStorage can't bypass the Lock.
 */
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['visited', 'settings'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const PERSIST_ACTIONS = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

type SetupStoreOptions = {
  /** Sagas hit the keychain and AppState, so tests opt in explicitly. */
  runSagas?: boolean;
};

export function setupStore(
  preloadedState?: Partial<RootState>,
  { runSagas = false }: SetupStoreOptions = {},
) {
  const sagaMiddleware = createSagaMiddleware();

  const testStore = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(countriesApi.middleware)
        .concat(sagaMiddleware),
  });

  if (runSagas) {
    sagaMiddleware.run(rootSaga);
  }

  return testStore;
}

/** App store: persisted to AsyncStorage, sagas running. */
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: PERSIST_ACTIONS },
    })
      .concat(countriesApi.middleware)
      .concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
