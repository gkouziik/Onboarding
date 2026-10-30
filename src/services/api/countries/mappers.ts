import { Country } from '@/services/api/countries/types.ts';
import { CountryDetail, CountrySummary } from '@/models/countries.ts';

export function toCountrySummary(country: Country): CountrySummary {
  return {
    code: country.codes?.alpha_3 ?? country.uuid,
    name: country.names.common,
    region: country.region,
    flagUrl: country.flag?.url_png ?? '',
    flagEmoji: country.flag?.emoji ?? '',
    population: country.population ?? 0,
    area: country.area?.kilometers ?? 0,
  };
}

export function toCountryDetail(country: Country): CountryDetail {
  return {
    ...toCountrySummary(country),
    officialName: country.names.official,
    capitals: (country.capitals ?? []).map(capital => capital.name),
    subregion: country.subregion,
    languages: (country.languages ?? []).map(language => language.name),
    currencies: (country.currencies ?? []).map(({ code, name, symbol }) => ({
      code,
      name,
      symbol,
    })),
    borders: country.borders ?? [],
  };
}
