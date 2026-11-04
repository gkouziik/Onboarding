import { useEffect } from 'react';

import i18n from '@/i18n';
import { useAppSelector } from '@/store/hooks.ts';
import { selectLanguage } from '@/store/selectors/settingsSelectors.ts';

/**
 * Applies the stored language to i18next whenever it changes.
 * The store is the single source of truth; i18next follows it.
 */
export function LanguageSync() {
  const language = useAppSelector(selectLanguage);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return null;
}
