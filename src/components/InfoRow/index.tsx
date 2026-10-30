import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { styles } from '@/components/InfoRow/styles.ts';
import { AppText } from '@/components/AppText';
import { formatInfoValue } from '@/components/InfoRow/utils.ts';
import { Value } from '@/components/InfoRow/types.ts';

interface InfoRowProps {
  label: string;
  value: Value;
}

/**
 * "Label - value" line.
 * Used for Detail fields (capital, population, languages…).
 * */
function InfoRow({ label, value }: InfoRowProps) {
  const text = useMemo(() => formatInfoValue(value), [value]);

  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel={`${label}: ${text}`}
    >
      <AppText variant="p2" color="text2">
        {label}
      </AppText>
      <AppText variant="p1" style={styles.value}>
        {text}
      </AppText>
    </View>
  );
}

export default memo(InfoRow);
