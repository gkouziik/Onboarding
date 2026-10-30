import { View } from 'react-native';

import { styles } from '@/components/LoadingView/styles.ts';
import { ThemedActivityIndicator } from '@/components/LoadingView/components/ThemedActivityIndicator';
import { AppText } from '@/components/AppText';

interface LoadingViewProps {
  /**
   * Label to render while loading the data
   */
  label?: string;
}

/**
 * Full screen Loading state component rendered in all screen
 */
export function LoadingView({ label = 'Loading...' }: LoadingViewProps) {
  return (
    <View style={styles.container}>
      <ThemedActivityIndicator size="large" />
      <AppText color="text2">{label}</AppText>
    </View>
  );
}
