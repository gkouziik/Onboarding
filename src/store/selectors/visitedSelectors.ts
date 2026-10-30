import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/store';

const selectVisitedByCode = (state: RootState) => state.visited.byCode;

export const selectIsVisited = (state: RootState, code: string) =>
  code in state.visited.byCode;

export const selectVisitedList = createSelector(selectVisitedByCode, byCode =>
  Object.values(byCode).sort((a, b) => a.name.localeCompare(b.name)),
);

export const selectVisitedCount = createSelector(
  selectVisitedByCode,
  byCode => Object.keys(byCode).length,
);
