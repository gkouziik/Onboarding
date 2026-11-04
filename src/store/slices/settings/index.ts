import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_LANGUAGE, type Language } from '@/i18n';

export type SettingsState = {
  language: Language;
};

const initialState: SettingsState = {
  language: DEFAULT_LANGUAGE,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
