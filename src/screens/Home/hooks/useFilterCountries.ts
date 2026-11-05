import { CountrySummary } from '@/models/countries.ts';
import { ContinentFilter, SortDirection } from '@/screens/Home/types.ts';
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
  /**
   * the sort direction either asc or desc
   */
  sortDirection: SortDirection;
}

/**
 * Hook that filters countries based on continent chp selection
 * and search query
 */
export const useFilterCountries = ({
  data,
  search,
  continent,
  sortDirection,
}: Props) => {
  return useMemo(() => {
    if (!data) {
      return [];
    }
    const query = search.trim().toLowerCase();

    return data
      .filter(
        country =>
          (continent === 'All' || country.region === continent) &&
          (!query || country.name.toLowerCase().includes(query)),
      )
      .sort((a, b) =>
        sortDirection === 'asc'
          ? a.population - b.population
          : b.population - a.population,
      );
  }, [continent, data, search, sortDirection]);
};
