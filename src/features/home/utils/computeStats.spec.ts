import { toCountrySummary } from '@/services/api/countries/mappers.ts';
import {
  antarctica,
  greece,
  italy,
} from '@/services/api/countries/__fixtures__';
import { computeStats } from '@/features/home/utils/computeStats.ts';

const countries = [greece, italy, antarctica].map(toCountrySummary);

describe('computeStats', () => {
  it('computes totals and average area', () => {
    const stats = computeStats(countries);

    expect(stats.totalCountries).toBe(3);
    expect(stats.totalPopulation).toBe(10715549 + 59554023 + 1000);
    expect(stats.averageArea).toBe((131990 + 301336 + 14000000) / 3);
  });

  it('returns the top countries by population', () => {
    const stats = computeStats(countries);

    expect(stats.topByPopulation.map(country => country.name)).toEqual([
      'Italy',
      'Greece',
      'Antarctica',
    ]);
  });

  it('counts countries per continent, including empty ones', () => {
    expect(computeStats(countries).countByContinent).toEqual({
      Africa: 0,
      Oceania: 0,
      Europe: 2,
      Americas: 0,
      Antarctic: 1,
      Asia: 0,
    });
  });

  it('handles an empty list', () => {
    const stats = computeStats([]);

    expect(stats.totalCountries).toBe(0);
    expect(stats.averageArea).toBe(0);
    expect(stats.topByPopulation).toEqual([]);
  });
});
