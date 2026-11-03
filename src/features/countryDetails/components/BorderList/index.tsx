import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppText } from '@/components/AppText';
import { RootStackParamList } from '@/navigation/RootNavigator/types.ts';
import { useGetAllCountriesQuery } from '@/services/api/countries/countriesApi.ts';

import { styles } from './styles.ts';
import Chip from '@/features/home/components/Chip';
import { Card } from '@/features/home/components/Card';

type Props = {
  /**
   *  Alpha-3 codes of the bordering countries.
   */
  borders: string[];
};

/**
 * Component that renders the list of bordered countries with the selected country
 * coming from CountryDetails Screen
 */
function BorderList({ borders }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { data: allCountries } = useGetAllCountriesQuery();

  const borderCountries = useMemo(() => {
    const namesByCode = new Map(
      (allCountries ?? []).map(country => [country.code, country.name]),
    );
    return borders.map(code => ({ code, name: namesByCode.get(code) ?? code }));
  }, [allCountries, borders]);

  return (
    <Card title="Borders">
      {borderCountries.length === 0 ? (
        <AppText color="text2">No land borders</AppText>
      ) : (
        <View style={styles.chips}>
          {borderCountries.map(({ code, name }) => (
            <Chip
              key={code}
              label={name}
              onPress={() => navigation.push('CountryDetail', { code })}
            />
          ))}
        </View>
      )}
    </Card>
  );
}

export default memo(BorderList);
