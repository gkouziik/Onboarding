import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { styles } from '@/components/InfoRow/styles.ts';
import { AppText } from '@/components/AppText';
import { formatInfoValue } from '@/components/InfoRow/utils.ts';
import { Value } from '@/components/InfoRow/types.ts';
import { TypographyVariant } from '@/theme/typography';

interface InfoRowProps {
  label: string;
  value: Value;
  labelVariant?: TypographyVariant;
  valueVariant?: TypographyVariant;
}

/**
 * "Label - value" line.
 * Used for Detail fields (capital, population, languages…).
 * */
function InfoRow({
  label,
  value,
  labelVariant = 'p2',
  valueVariant = 'p1',
}: InfoRowProps) {
  const text = useMemo(() => formatInfoValue(value), [value]);

  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel={`${label}: ${text}`}
    >
      <AppText variant={labelVariant} color="text2">
        {label}
      </AppText>
      <AppText variant={valueVariant} style={styles.value}>
        {text}
      </AppText>
    </View>
  );
}

export default memo(InfoRow);
