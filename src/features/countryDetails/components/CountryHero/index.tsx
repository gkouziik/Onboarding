import React, { memo } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components/AppText';
import { FlagImage } from '@/components/FlagImage';
import { CountryDetail } from '@/models/countries.ts';

import { styles } from './styles.ts';

type Props = {
  country: CountryDetail;
};

function CountryHero({ country }: Props) {
  return (
    <View style={styles.container}>
      <FlagImage uri={country.flagUrl} emoji={country.flagEmoji} size="lg" />
      <AppText variant="h2" style={styles.center}>
        {country.name}
      </AppText>
      <AppText variant="p2" color="text2" style={styles.center}>
        {country.officialName}
      </AppText>
    </View>
  );
}

export default memo(CountryHero);
