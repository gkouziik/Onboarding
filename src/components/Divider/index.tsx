import { View } from 'react-native';

import { styles } from '@/components/Divider/styles.ts';

/**
 * Horizontal line between rows. Rendered in {@see Home} and
 * {@see countryDetails}
 */
export function Divider() {
  return <View style={styles.divider} />;
}
