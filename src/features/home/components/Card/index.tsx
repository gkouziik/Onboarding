import React, { type ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from '@/components/AppText';
import { styles } from '@/features/home/components/Card/styles.ts';

interface Props {
  /**
   * Optional section title
   * */
  title?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Surface box with optional title. Used by the Stats panel and Detail sections.
 */
export function Card({ title, children, style }: Props) {
  return (
    <View style={[styles.card, style]}>
      {title ? <AppText variant="h3">{title}</AppText> : null}
      {children}
    </View>
  );
}
