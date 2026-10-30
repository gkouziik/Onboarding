import React, { type ReactNode } from 'react';
import { ScrollView, View } from 'react-native';

import { styles } from '@/components/ScreenWrapper/styles.ts';

type Edge = 'top' | 'bottom';

type Props = {
  children: ReactNode;
  /**
   *  Wrap content in a ScrollView.
   */
  scroll?: boolean;
  /**
   * Safe-area edges to pad. Default: none, because the navigation header and
   * tab bar already handle top and bottom insets.
   */
  edges?: Edge[];
};

/**
 *  Root wrapper for every screen: themed background and optional safe-area padding.
 */
export function Screen({ children, scroll = false, edges = [] }: Props) {
  const top = edges.includes('top');
  const bottom = edges.includes('bottom');

  if (scroll) {
    return (
      <ScrollView
        style={styles.base}
        contentContainerStyle={styles.insets(top, bottom)}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.base, styles.insets(top, bottom)]}>{children}</View>
  );
}
