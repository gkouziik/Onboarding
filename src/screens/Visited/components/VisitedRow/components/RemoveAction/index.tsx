import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  ACTION_WIDTH,
  styles,
} from '@/screens/Visited/components/VisitedRow/styles.ts';
import { AppText } from '@/components/AppText';
import React from 'react';

type RemoveActionProps = {
  drag: SharedValue<number>;
};

function RemoveAction({ drag }: RemoveActionProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    // drag goes from 0 to negative while swiping left
    transform: [{ translateX: drag.value + ACTION_WIDTH }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      -drag.value,
      [0, ACTION_WIDTH * 0.6],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <Animated.View style={[styles.action, animatedStyle]}>
      <Animated.View style={labelStyle}>
        <AppText style={styles.actionLabel}>Remove</AppText>
      </Animated.View>
    </Animated.View>
  );
}

export default RemoveAction;
