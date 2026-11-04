import React, { memo } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

import Chip from '@/components/Chip';
import { CONTINENT_TABS } from '@/features/home/constants.ts';
import { ContinentFilter } from '@/features/home/types.ts';
import { styles } from '@/features/home/components/ContinentTabs/styles.ts';

type Props = {
  /**
   * selected chip e.g All or Europe
   * {@see ContinentFilter}
   */
  selected: ContinentFilter;
  /**
   * onSelect press function that
   * sets the selected state
   */
  onSelect: (tab: ContinentFilter) => void;
};

const passedStyle: StyleProp<ViewStyle> = {
  marginBottom: 10,
};

/**
 * Continent Tabs component that renders a map of chips cards
 * for continent filters wrapped in a ScrollView
 */
function ContinentTabs({ selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.tabs}
      accessibilityRole="tablist"
    >
      {CONTINENT_TABS.map(tab => (
        <Chip
          testID={tab}
          key={tab}
          passedStyles={passedStyle}
          label={tab}
          selected={tab === selected}
          onPress={() => onSelect(tab)}
        />
      ))}
    </ScrollView>
  );
}

export default memo(ContinentTabs);
