import { memo } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

import { AppText } from '@/components/AppText';
import { styles } from '@/components/Chip/styles.ts';

interface Props extends PressableProps {
  /**
   * The label for the chip
   */
  label: string;
  /**
   * boolean property that denotes if the chip is selected
   */
  selected?: boolean;
  passedStyles?: StyleProp<ViewStyle>;
}

/**
 * Rounded pill. Used for the continent tabs (Home) and the bordering
 * countries Detail.
 */
function Chip({
  label,
  onPress,
  selected = false,
  testID,
  passedStyles,
}: Props) {
  styles.useVariants({ selected });

  return (
    <Pressable
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        styles.chip,
        pressed && styles.pressed,
        passedStyles,
      ]}
    >
      <AppText variant="p2" color={selected ? 'text2' : 'text'}>
        {label}
      </AppText>
    </Pressable>
  );
}
export default memo(Chip);
