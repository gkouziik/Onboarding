import { useMemo } from 'react';

import { CONTINENTS, Continent, CountrySummary } from '@/models/countries.ts';

export type CountryStats = {
  /**
   * Total number of countries
   */
  totalCountries: number;
  /**
   * Total population of all countries
   */
  totalPopulation: number;
  /**
   * Average country area in km²
   */
  averageArea: number;
  /**
   * Top 5 countries by population
   */
  topByPopulation: CountrySummary[];
  /**
   * Number of countries per continent
   */
  countByContinent: Record<Continent, number>;
};

const TOP_COUNT = 5;

const isContinent = (region: string): region is Continent =>
  (CONTINENTS as readonly string[]).includes(region);

/**
 * Hook that calculates stats for the full country list:
 * total countries, total population, average area,
 * top countries by population and country count per continent.
 * Memoized: recalculated only when the countries array changes.
 * @param countries | The countries {@see CountrySummary}
 */
export function useComputeStats(
  countries: readonly CountrySummary[],
): CountryStats {
  return useMemo(() => {
    const countByContinent = Object.fromEntries(
      CONTINENTS.map(continent => [continent, 0]),
    ) as Record<Continent, number>;

    let totalPopulation = 0;
    let totalArea = 0;

    for (const country of countries) {
      totalPopulation += country.population;
      totalArea += country.area;
      if (isContinent(country.region)) {
        countByContinent[country.region] += 1;
      }
    }

    return {
      totalCountries: countries.length,
      totalPopulation,
      averageArea: countries.length > 0 ? totalArea / countries.length : 0,
      topByPopulation: [...countries]
        .sort((a, b) => b.population - a.population)
        .slice(0, TOP_COUNT),
      countByContinent,
    };
  }, [countries]);
}
