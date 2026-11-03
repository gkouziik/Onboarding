import React, { useCallback, useMemo, useRef, useState } from 'react';

import { useGetAllCountriesQuery } from '@/services/api/countries/countriesApi.ts';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { LoadingView } from '@/components/LoadingView';
import { ErrorView } from '@/components/ErrorView';
import { SearchInput } from '@/features/home/components/SearchInput';
import { ContinentFilter, SortDirection } from '@/features/home/types.ts';
import ContinentTabs from '@/features/home/components/ContinentTabs';
import CountryList from '@/features/home/components/CountryList';
import { FlatList } from 'react-native';
import { CountrySummary } from '@/models/countries.ts';
import { useFilterCountries } from '@/features/home/hooks/useFilterCountries.ts';
import { computeStats } from '@/features/home/utils/computeStats.ts';
import StatsPanel from '@/features/home/components/StatsPanel';
import SortToggle from '@/features/home/components/SortToggle';

export function Home() {
  const { data, isLoading, isError, refetch } = useGetAllCountriesQuery();
  const [search, setSearch] = useState('');
  const [continent, setContinent] = useState<ContinentFilter>('All');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const listRef = useRef<FlatList<CountrySummary>>(null);

  const countries = useFilterCountries({
    data,
    continent,
    search,
    sortDirection,
  });
  const stats = useMemo(() => computeStats(data ?? []), [data]);

  const handleContinentSelect = useCallback((tab: ContinentFilter) => {
    setContinent(tab);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  const handleSortToggle = useCallback(() => {
    setSortDirection(current => (current === 'desc' ? 'asc' : 'desc'));
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
      <SortToggle direction={sortDirection} onToggle={handleSortToggle} />

      <CountryList
        countries={countries}
        ref={listRef}
        header={<StatsPanel stats={stats} />}
      />
    </ScreenWrapper>
  );
}
