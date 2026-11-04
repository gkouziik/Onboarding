import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { el } from './locales/el.ts';
import { en } from './locales/en.ts';

export const LANGUAGES = ['en', 'el'] as const;
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'en';

export const resources = {
  en: { translation: en },
  el: { translation: el },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
