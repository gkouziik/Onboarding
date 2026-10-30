import React, { memo, useCallback, type ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import type { CountrySummary } from '@/models/countries';
import { styles } from '@/components/CountryListItem/styles.ts';
import { FlagImage } from '@/components/FlagImage';
import { AppText } from '@/components/AppText';
import { SvgResolver } from '@/components/SVGResolver';

interface CountryListItemProps {
  country: CountrySummary;
  /**
   * Receives the country code,
   * so the parent can pass one stable callback.
   * */
  onPress: (code: string) => void;
  /**
   *  Replaces the chevron,
   *  e.g. a remove button on the Visited screen.
   */
  right?: ReactNode;
}

/**
 * A country row: flag, name and region.
 *  Used by the Home and Visited lists.
 */
function CountryListItem({ country, onPress, right }: CountryListItemProps) {
  const handlePress = useCallback(
    () => onPress(country.code),
    [onPress, country.code],
  );

  return (
    <View style={styles.row}>
      <Pressable
        onPress={handlePress}
        testID={`country-item-${country.code}`}
        style={({ pressed }) => [styles.main, pressed && styles.pressed]}
      >
        <FlagImage uri={country.flagUrl} emoji={country.flagEmoji} />

        <View style={styles.text}>
          <AppText variant="p1" numberOfLines={1}>
            {country.name}
          </AppText>
          <AppText variant="p3" color="text2" numberOfLines={1}>
            {country.region}
          </AppText>
        </View>

        {right ? null : (
          <SvgResolver name="chevronRight" size="32" color="text2" />
        )}
      </Pressable>

      {right}
    </View>
  );
}

export default memo(CountryListItem);
