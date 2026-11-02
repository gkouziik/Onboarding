import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CountrySummary } from '@/models/countries.ts';
import CountryListItem from '@/components/CountryListItem';
import { Divider } from '@/components/Divider';
import { useGetAllCountriesQuery } from '@/services/api/countries/countriesApi.ts';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { LoadingView } from '@/components/LoadingView';
import { ErrorView } from '@/components/ErrorView';
import { EmptyView } from '@/components/EmptyView';
import { SearchInput } from '@/features/home/components/SearchInput';
import { styles } from '@/features/home/styles.ts';

const keyExtractor = (item: CountrySummary) => `${item.code}-${item.name}`;

export function Home() {
  const navigation = useNavigation();
  const { data, isLoading, isError, refetch } = useGetAllCountriesQuery();
  const [search, setSearch] = useState('');

  const countries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!data || !query) {
      return data;
    }
    return data.filter(country => country.name.toLowerCase().includes(query));
  }, [data, search]);

  const handleCountryPress = useCallback(
    (code: string) => navigation.navigate('CountryDetail', { code }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<CountrySummary>) => (
      <CountryListItem country={item} onPress={handleCountryPress} />
    ),
    [handleCountryPress],
  );

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
        style={styles.searchContainer}
      />
      <FlatList
        data={countries}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={
          <EmptyView title="No countries found" message="Try another name." />
        }
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    </ScreenWrapper>
  );
}
