import { CONTINENTS, Continent, CountrySummary } from '@/models/countries.ts';

export type CountryStats = {
  totalCountries: number;
  totalPopulation: number;
  averageArea: number;
  topByPopulation: CountrySummary[];
  countByContinent: Record<Continent, number>;
};

const isContinent = (region: string): region is Continent =>
  (CONTINENTS as readonly string[]).includes(region);

export function computeStats(countries: CountrySummary[]): CountryStats {
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
      .slice(0, 5),
    countByContinent,
  };
}
