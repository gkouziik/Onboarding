import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CountrySummary } from '@/models/countries';

export type VisitedState = {
  byCode: Record<string, CountrySummary>;
};

const initialState: VisitedState = {
  byCode: {},
};

const visitedSlice = createSlice({
  name: 'visited',
  initialState,
  reducers: {
    /** Adds the country if missing, removes it if present. */
    toggleVisited(state, action: PayloadAction<CountrySummary>) {
      const { code } = action.payload;
      if (state.byCode[code]) {
        delete state.byCode[code];
      } else {
        state.byCode[code] = action.payload;
      }
    },
    removeVisited(state, action: PayloadAction<string>) {
      delete state.byCode[action.payload];
    },
  },
});

export const { toggleVisited, removeVisited } = visitedSlice.actions;
export const visitedReducer = visitedSlice.reducer;
