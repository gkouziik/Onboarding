import {
  toCountryDetail,
  toCountrySummary,
} from '@/services/api/countries/mappers.ts';
import { antarctica, greece } from '@/services/api/countries/__fixtures__';

describe('toCountrySummary', () => {
  it('maps the list fields', () => {
    expect(toCountrySummary(greece)).toEqual({
      code: 'GRC',
      name: 'Greece',
      region: 'Europe',
      flagUrl: 'https://flags.test/grc.png',
      flagEmoji: '',
      population: 10715549,
      area: 131990,
    });
  });
});

describe('toCountryDetail', () => {
  it('maps the full profile', () => {
    const detail = toCountryDetail(greece);

    expect(detail.officialName).toBe('Hellenic Republic');
    expect(detail.capitals).toEqual(['Athens']);
    expect(detail.languages).toEqual(['Greek']);
    expect(detail.currencies).toEqual([
      { code: 'EUR', name: 'Euro', symbol: '€' },
    ]);
    expect(detail.borders).toEqual(['ALB', 'BGR', 'TUR', 'MKD']);
  });

  it('handles sparse countries safely', () => {
    const detail = toCountryDetail(antarctica);

    expect(detail.capitals).toEqual([]);
    expect(detail.languages).toEqual([]);
    expect(detail.currencies).toEqual([]);
    expect(detail.borders).toEqual([]);
  });
});
