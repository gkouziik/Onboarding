import React, { useCallback, useRef, useState } from 'react';

import { useGetAllCountriesQuery } from '@/services/api/countries';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { LoadingView } from '@/components/LoadingView';
import { ErrorView } from '@/components/ErrorView';
import { ContinentFilter, SortDirection } from '@/features/home/types.ts';
import CountryList from '@/features/home/components/CountryList';
import { FlatList } from 'react-native';
import { CountrySummary } from '@/models/countries.ts';
import { useFilterCountries } from '@/features/home/hooks/useFilterCountries.ts';
import { useComputeStats } from '@/features/home/utils/computeStats.ts';
import StatsPanel from '@/features/home/components/StatsPanel';
import Header from '@/features/home/components/Header';
import { PAGE_SIZE } from '@/features/home/constants.ts';
import { usePagination } from '@/features/home/hooks/usePagination.ts';
import FiltersBar from '@/features/home/components/FiltersBar';

/**
 * [] === [] false: two different objects
 * we need to have the same reference
 */
const EMPTY_COUNTRIES: CountrySummary[] = [];

export function Home() {
  const { data, isLoading, isError, refetch, isFetching } =
    useGetAllCountriesQuery();
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
  const stats = useComputeStats(data ?? EMPTY_COUNTRIES);

  const {
    visibleItems: visibleCountries,
    loadMore,
    reset,
  } = usePagination(countries, PAGE_SIZE);

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearch(text);
      reset();
    },
    [reset],
  );

  const handleRefresh = useCallback(() => {
    reset();
    refetch();
  }, [refetch, reset]);

  const handleContinentSelect = useCallback(
    (tab: ContinentFilter) => {
      setContinent(tab);
      reset();
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    },
    [reset],
  );

  const handleSortToggle = useCallback(() => {
    setSortDirection(current => (current === 'desc' ? 'asc' : 'desc'));
    reset();
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [reset]);

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
      <Header search={search} onSearchChange={handleSearchChange} />

      <FiltersBar
        continent={continent}
        onContinentSelect={handleContinentSelect}
        sortDirection={sortDirection}
        onSortToggle={handleSortToggle}
      />

      <CountryList
        countries={visibleCountries}
        ref={listRef}
        refreshing={isFetching && !isLoading}
        onRefresh={handleRefresh}
        onEndReached={loadMore}
        header={<StatsPanel stats={stats} />}
      />
    </ScreenWrapper>
  );
}
