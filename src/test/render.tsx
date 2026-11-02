import React, { type PropsWithChildren, type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { AppStore, RootState, setupStore } from '@/store';

type Options = Omit<RenderOptions, 'wrapper'> & {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
};

/**
 *   Renders with a fresh Redux store and safe-area provider.
 *   Returns the store too.
 */
export async function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    ...options
  }: Options = {},
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={store}>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </Provider>
    );
  }

  const result = await render(ui, { wrapper: Wrapper, ...options });
  return { store, ...result };
}

export * from '@testing-library/react-native';
