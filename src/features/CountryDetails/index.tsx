import React from 'react';
import { Text, View } from 'react-native';

import { styles } from '@/features/CountryDetails/styles.ts';

export function CountryDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Country:</Text>
    </View>
  );
}
