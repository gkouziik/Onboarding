import React, { useCallback, useRef, useState } from 'react';

import { useGetAllCountriesQuery } from '@/services/api/countries/countriesApi.ts';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { LoadingView } from '@/components/LoadingView';
import { ErrorView } from '@/components/ErrorView';
import { SearchInput } from '@/features/home/components/SearchInput';
import { ContinentFilter } from '@/features/home/types.ts';
import ContinentTabs from '@/features/home/components/ContinentTabs';
import CountryList from '@/features/home/components/CountryList';
import { FlatList } from 'react-native';
import { CountrySummary } from '@/models/countries.ts';
import { useFilterCountries } from '@/features/home/hooks/useFilterCountries.ts';

export function Home() {
  const { data, isLoading, isError, refetch } = useGetAllCountriesQuery();
  const [search, setSearch] = useState('');
  const [continent, setContinent] = useState<ContinentFilter>('All');
  const listRef = useRef<FlatList<CountrySummary>>(null);

  const countries = useFilterCountries({ data, continent, search });

  const handleContinentSelect = useCallback((tab: ContinentFilter) => {
    setContinent(tab);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  if (isLoading) {
    return (
      <ScreenWrapper edges={['top']}>
        <LoadingView />
      </ScreenWrapper>
    );
  }

  if (isError) {
    return (
      <ScreenWrapper edges={['top']}>
        <ErrorView onRetry={refetch} />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper edges={['top']}>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search countries"
      />

      <ContinentTabs onSelect={handleContinentSelect} selected={continent} />

      <CountryList countries={countries} ref={listRef} />
    </ScreenWrapper>
  );
}
