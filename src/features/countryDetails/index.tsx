import React, { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

import { EmptyView } from '@/components/EmptyView';
import { ErrorView } from '@/components/ErrorView';
import { LoadingView } from '@/components/LoadingView';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { RootStackParamList } from '@/navigation/RootNavigator/types.ts';
import { useGetCountryByCodeQuery } from '@/services/api/countries/countriesApi.ts';

import BorderList from './components/BorderList';
import CountryHero from './components/CountryHero';
import CountryProfile from './components/CountryProfile';
import VisitedToggle from './components/VisitedToggle';
import { styles } from './styles.ts';

const isNotFound = (error: FetchBaseQueryError | SerializedError | undefined) =>
  Boolean(error && 'status' in error && error.status === 404);

export function CountryDetails() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'CountryDetail'>>();
  const navigation = useNavigation();
  const {
    data: country,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCountryByCodeQuery(params.code);

  useLayoutEffect(() => {
    navigation.setOptions({ title: country?.name ?? '' });
  }, [navigation, country?.name]);

  if (isLoading) {
    return (
      <ScreenWrapper>
        <LoadingView />
      </ScreenWrapper>
    );
  }

  if (isError) {
    return (
      <ScreenWrapper>
        {isNotFound(error) ? (
          <EmptyView
            title="Country not found"
            message="It may have been removed."
          />
        ) : (
          <ErrorView onRetry={refetch} />
        )}
      </ScreenWrapper>
    );
  }

  if (!country) {
    return null;
  }

  return (
    <ScreenWrapper edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CountryHero country={country} />
        <VisitedToggle country={country} />
        <CountryProfile country={country} />
        <BorderList borders={country.borders} />
      </ScrollView>
    </ScreenWrapper>
  );
}
