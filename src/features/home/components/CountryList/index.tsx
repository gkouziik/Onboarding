import React, { forwardRef, memo, ReactElement, useCallback } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CountryListItem from '@/components/CountryListItem';
import { Divider } from '@/components/Divider';
import { EmptyView } from '@/components/EmptyView';
import { CountrySummary } from '@/models/countries.ts';
import { PAGE_SIZE } from '@/features/home/constants.ts';

type Props = {
  countries: CountrySummary[];
  header?: ReactElement;
  onEndReached?: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
};

const keyExtractor = (item: CountrySummary) => `${item.code}-${item.name}`;

const CountryList = forwardRef<FlatList<CountrySummary>, Props>(
  ({ countries, header, onEndReached, onRefresh, refreshing = false }, ref) => {
    const navigation = useNavigation();

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

    return (
      <FlatList
        ref={ref}
        data={countries}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={header}
        onEndReachedThreshold={0.5}
        initialNumToRender={PAGE_SIZE}
        onEndReached={onEndReached}
        testID="country-list"
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              testID="refresh-control"
            />
          ) : undefined
        }
        ListEmptyComponent={
          <EmptyView
            title="No countries found"
            message="Try another name or continent."
          />
        }
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    );
  },
);

CountryList.displayName = 'CountryList';

export default memo(CountryList);
