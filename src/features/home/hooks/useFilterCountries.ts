import { CountrySummary } from '@/models/countries.ts';
import { ContinentFilter } from '@/features/home/types.ts';
import { useMemo } from 'react';

interface Props {
  /**
   * Countries data fetched from rtk
   */
  data?: CountrySummary[];
  /**
   * search string query input provided by user in search input
   */
  search: string;
  /**
   * continent selected as chip
   */
  continent: ContinentFilter;
}

/**
 * Hook that filters countries based on continent chp selection
 * and search query
 */
export const useFilterCountries = ({ data, search, continent }: Props) => {
  return useMemo(() => {
    if (!data) {
      return [];
    }
    const query = search.trim().toLowerCase();

    return data.filter(
      country =>
        (continent === 'All' || country.region === continent) &&
        (!query || country.name.toLowerCase().includes(query)),
    );
  }, [continent, data, search]);
};
