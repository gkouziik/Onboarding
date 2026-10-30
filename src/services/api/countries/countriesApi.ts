import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { env } from '@/config/env.ts';
import { toCountryDetail, toCountrySummary } from './mappers.ts';
import type { Country, ListResponse } from './types.ts';
import { CountryDetail, CountrySummary } from '@/models/countries.ts';

export const PAGE_LIMIT = 100;

const LIST_FIELDS = [
  'uuid',
  'names.common',
  'codes.alpha_3',
  'region',
  'population',
  'area.kilometers',
  'flag.url_png',
  'flag.emoji',
].join(',');

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiUrl,
    prepareHeaders: headers => {
      if (env.apiKey) {
        headers.set('Authorization', `Bearer ${env.apiKey}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 5 * 60, // default: 5 min
  endpoints: builder => ({
    /**
     * Every country, as one cached array.
     * v5 caps a page at 100, so this fetches page 1, reads meta.total,
     * fetches the remaining pages in parallel and merges them.
     * UI pagination (20 per page) is a separate concern, done on the Home screen.
     */
    getAllCountries: builder.query<CountrySummary[], void>({
      async queryFn(_arg, _api, _extraOptions, baseQuery) {
        const fetchPage = (offset: number) =>
          baseQuery({
            url: '',
            params: { limit: PAGE_LIMIT, offset, response_fields: LIST_FIELDS },
          });

        const first = await fetchPage(0);
        if (first.error) {
          return { error: first.error };
        }

        const { objects, meta } = (first.data as ListResponse<Country>).data;

        const offsets: number[] = [];
        for (
          let offset = PAGE_LIMIT;
          offset < meta.total;
          offset += PAGE_LIMIT
        ) {
          offsets.push(offset);
        }

        const rest = await Promise.all(offsets.map(fetchPage));

        // never return a partial list
        const failed = rest.find(result => result.error);
        if (failed?.error) {
          return { error: failed.error };
        }

        const all = [
          ...objects,
          ...rest.flatMap(
            result => (result.data as ListResponse<Country>).data.objects,
          ),
        ];

        return { data: all.map(toCountrySummary) };
      },
      keepUnusedDataFor: 60 * 60, // 1h
    }),

    /** Full profile for one country, by alpha-3 code. */
    getCountryByCode: builder.query<CountryDetail, string>({
      async queryFn(code, _api, _extraOptions, baseQuery) {
        const result = await baseQuery(
          `codes.alpha_3/${encodeURIComponent(code)}`,
        );
        if (result.error) {
          return { error: result.error };
        }

        const country = (result.data as ListResponse<Country>).data.objects[0];
        if (!country) {
          return {
            error: {
              status: 404,
              data: { message: `Country ${code} not found` },
            },
          };
        }

        return { data: toCountryDetail(country) };
      },
      keepUnusedDataFor: 10 * 60,
    }),
  }),
});

export const { useGetAllCountriesQuery, useGetCountryByCodeQuery } =
  countriesApi;
