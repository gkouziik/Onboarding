import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from '@/features/home/styles.ts';

export function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate('CountryDetail', { code: 'GRC' })}
        style={styles.button}
      >
        <Text style={styles.text}>Open Greece</Text>
      </Pressable>
    </View>
  );
}
