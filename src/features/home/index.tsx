import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CountrySummary } from '@/models/countries.ts';
import CountryListItem from '@/components/CountryListItem';
import { Divider } from '@/components/Divider';
import { useGetAllCountriesQuery } from '@/services/api/countries/countriesApi.ts';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { LoadingView } from '@/components/LoadingView';
import { ErrorView } from '@/components/ErrorView';

const keyExtractor = (item: CountrySummary) => `${item.code}-${item.name}`;

export function Home() {
  const navigation = useNavigation();
  const { data, isLoading, isError, refetch } = useGetAllCountriesQuery();

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
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
    </ScreenWrapper>
  );
}
