import type { RootState } from '@/store';

export const selectLanguage = (state: RootState) => state.settings.language;
