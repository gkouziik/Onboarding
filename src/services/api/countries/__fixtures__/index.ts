import type { Country } from '@/services/api/countries/types';

export const greece: Country = {
  uuid: 'uuid-grc',
  population: 10715549,
  region: 'Europe',
  subregion: 'Southern Europe',
  names: { common: 'Greece', official: 'Hellenic Republic' },
  capitals: [{ name: 'Athens' }],
  area: { kilometers: 131990 },
  flag: {
    emoji: '',
    url_png: 'https://flags.test/grc.png',
    url_svg: 'https://flags.test/grc.svg',
  },
  codes: { alpha_2: 'GR', alpha_3: 'GRC' },
  borders: ['ALB', 'BGR', 'TUR', 'MKD'],
  languages: [{ name: 'Greek' }],
  currencies: [{ code: 'EUR', name: 'Euro', symbol: '€' }],
};

export const italy: Country = {
  uuid: 'uuid-ita',
  population: 59554023,
  region: 'Europe',
  names: { common: 'Italy', official: 'Italian Republic' },
  capitals: [{ name: 'Rome' }],
  area: { kilometers: 301336 },
  flag: {
    emoji: '',
    url_png: 'https://flags.test/ita.png',
    url_svg: 'https://flags.test/ita.svg',
  },
  codes: { alpha_3: 'ITA' },
};

export const antarctica: Country = {
  uuid: 'uuid-ata',
  population: 1000,
  region: 'Antarctic',
  names: { common: 'Antarctica', official: 'Antarctica' },
  capitals: [],
  area: { kilometers: 14000000 },
  flag: {
    emoji: '',
    url_png: 'https://flags.test/ata.png',
    url_svg: 'https://flags.test/ata.svg',
  },
  codes: { alpha_3: 'ATA' },
};

/** Generates `count` minimal countries for paging tests. */
export const makeCountries = (count: number, start = 0): Country[] =>
  Array.from({ length: count }, (_, i) => ({
    uuid: `uuid-${start + i}`,
    population: start + i,
    region: 'Europe',
    names: { common: `Country ${start + i}`, official: `Country ${start + i}` },
    capitals: [],
    area: { kilometers: 1 },
    flag: { emoji: '', url_png: '', url_svg: '' },
    codes: { alpha_3: `C${String(start + i).padStart(3, '0')}` },
  }));
