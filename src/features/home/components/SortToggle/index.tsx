import React, { memo, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { SortDirection } from '@/features/home/types.ts';
import { styles } from '@/features/home/components/SortToggle/styles.ts';
import { SvgResolver } from '@/components/SVGResolver';
import { AppText } from '@/components/AppText';

const ROTATION_DURATION_MS = 250;
const ASC_ROTATION_DEG = 180;
const DESC_ROTATION_DEG = 0;

const toRotation = (direction: SortDirection) =>
  direction === 'asc' ? ASC_ROTATION_DEG : DESC_ROTATION_DEG;

type Props = {
  direction: SortDirection;
  onToggle: () => void;
};

function SortToggle({ direction, onToggle }: Props) {
  const rotation = useSharedValue(toRotation(direction));

  useEffect(() => {
    rotation.value = withTiming(toRotation(direction), {
      duration: ROTATION_DURATION_MS,
    });
  }, [direction, rotation]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.sortToggleContainer}>
      <AppText variant="h3">{'Sorting:'}</AppText>
      <Pressable onPress={onToggle} style={styles.button}>
        <Animated.View style={iconStyle}>
          <SvgResolver name="sort" />
        </Animated.View>
      </Pressable>
    </View>
  );
}

export default memo(SortToggle);
