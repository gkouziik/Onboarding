import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import i18n from '@/i18n';
import { LanguageSync } from '@/i18n/LanguageSync';
import { selectLanguage } from '@/store/settings/selectors/settingsSelectors.ts';
import { fireEvent, renderWithProviders, screen } from '@/test/render.tsx';
import LanguageToggle from '@/components/LanguageToggle/index.tsx';

function Translated() {
  const { t } = useTranslation();
  return <Text>{t('home.searchPlaceholder')}</Text>;
}

const renderToggle = (options?: Parameters<typeof renderWithProviders>[1]) =>
  renderWithProviders(
    <>
      <LanguageSync />
      <LanguageToggle />
      <Translated />
    </>,
    options,
  );

describe('LanguageToggle', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('shows English by default', async () => {
    await renderToggle();

    expect(screen.getByText('Search countries')).toBeOnTheScreen();
  });

  it('switches to Greek and updates the store', async () => {
    const { store } = await renderToggle();

    await fireEvent.press(screen.getByTestId('ΕΛ'));

    expect(selectLanguage(store.getState())).toBe('el');
    expect(await screen.findByText('Αναζήτηση χωρών')).toBeOnTheScreen();
  });

  it('switches back to English', async () => {
    await renderToggle({ preloadedState: { settings: { language: 'el' } } });
    expect(await screen.findByText('Αναζήτηση χωρών')).toBeOnTheScreen();

    await fireEvent.press(screen.getByTestId('EN'));

    expect(await screen.findByText('Search countries')).toBeOnTheScreen();
  });
});
