import React from 'react';
import { Text, View } from 'react-native';

import { styles } from '@/features/visited/styles.ts';

export function Visited() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Visited</Text>
    </View>
  );
}
