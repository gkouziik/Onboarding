export const CONTINENTS = [
  'Africa',
  'Oceania',
  'Europe',
  'Americas',
  'Antarctic',
  'Asia',
] as const;

export type Continent = (typeof CONTINENTS)[number];

/**
 * Light model for lists,
 * stats and the visited slice.
 */
export type CountrySummary = {
  code: string;
  name: string;
  region: string;
  flagUrl: string;
  flagEmoji: string;
  population: number;
  area: number;
};

/**
 *  Full profile for the Detail screen.
 */
export type CountryDetail = CountrySummary & {
  officialName: string;
  capitals: string[];
  subregion?: string;
  languages: string[];
  currencies: { code: string; name: string; symbol?: string }[];
  borders: string[];
};
