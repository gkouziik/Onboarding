import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import i18n from '@/i18n';
import { LanguageSync } from '@/i18n/LanguageSync';
import { RootNavigator } from '@/navigation/RootNavigator';
import { persistor, store } from '@/store';

/** Apply the saved language before the first screen renders (no English flash). */
const applySavedLanguage = async () => {
  await i18n.changeLanguage(store.getState().settings.language);
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
          onBeforeLift={applySavedLanguage}
        >
          <LanguageSync />
          <SafeAreaProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
