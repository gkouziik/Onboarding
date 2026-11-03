import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppText } from '@/components/AppText';
import { Divider } from '@/components/Divider';
import { EmptyView } from '@/components/EmptyView';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { CountrySummary } from '@/models/countries.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { selectVisitedList } from '@/store/selectors/visitedSelectors.ts';
import VisitedRow from './components/VisitedRow';
import { removeVisited } from '@/store/slices/visited';
import { styles } from './styles.ts';

const keyExtractor = (item: CountrySummary) => item.code;

export function Visited() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectVisitedList);

  const handleCountryPress = useCallback(
    (code: string) => navigation.navigate('CountryDetail', { code }),
    [navigation],
  );

  const handleRemove = useCallback(
    (code: string) => dispatch(removeVisited(code)),
    [dispatch],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<CountrySummary>) => (
      <VisitedRow
        country={item}
        onPress={handleCountryPress}
        onRemove={handleRemove}
      />
    ),
    [handleCountryPress, handleRemove],
  );

  return (
    <ScreenWrapper edges={['top']}>
      <AppText variant="h2" style={styles.title}>
        {countries.length > 0 ? `Visited (${countries.length})` : 'Visited'}
      </AppText>

      <FlatList
        data={countries}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          countries.length === 0 ? styles.emptyContent : undefined
        }
        ListEmptyComponent={
          <EmptyView
            icon="heartOutline"
            title="No visited countries yet"
            message="Mark countries as visited from their detail page."
          />
        }
      />
    </ScreenWrapper>
  );
}
