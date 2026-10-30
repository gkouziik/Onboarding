import { createSelector } from '@reduxjs/toolkit';

import type { CountrySummary } from '@/models/countries';
import { countriesApi } from '@/services/api/countries/countriesApi';
import type { RootState } from '@/store';

const EMPTY: CountrySummary[] = [];

const selectAllCountriesResult =
  countriesApi.endpoints.getAllCountries.select();

/**
 * The cached full list (empty until loaded).
 */
export const selectAllCountries = createSelector(
  selectAllCountriesResult,
  result => result.data ?? EMPTY,
);

/**
 *  Resolves alpha-3 codes (e.g. borders) from the cached list, without a network call.
 */
export const selectCountriesByCodes = createSelector(
  [selectAllCountries, (_state: RootState, codes: string[]) => codes],
  (all, codes) => {
    const wanted = new Set(codes);
    return all.filter(country => wanted.has(country.code));
  },
);
