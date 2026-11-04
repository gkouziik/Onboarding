import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { IconButton } from '@/components/IconButton';
import { CountryDetail } from '@/models/countries.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { selectIsVisited } from '@/store/selectors/visitedSelectors.ts';
import { toggleVisited } from '@/store/slices/visited';

import { styles } from './styles.ts';

const POP_SCALE = 1.3;
const POP_STEP_MS = 250;

type Props = {
  country: CountryDetail;
};

function VisitedToggle({ country }: Props) {
  const dispatch = useAppDispatch();
  const isVisited = useAppSelector(state =>
    selectIsVisited(state, country.code),
  );

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(() => {
    if (!isVisited) {
      scale.value = withSequence(
        withTiming(POP_SCALE, { duration: POP_STEP_MS }),
        withTiming(1, { duration: POP_STEP_MS }),
      );
    }

    const { code, name, region, flagUrl, flagEmoji, population, area } =
      country;
    dispatch(
      toggleVisited({
        code,
        name,
        region,
        flagUrl,
        flagEmoji,
        population,
        area,
      }),
    );
  }, [country, dispatch, isVisited, scale]);

  return (
    <View style={styles.toggleButtonContainer}>
      <Animated.View style={animatedStyle}>
        <IconButton
          icon={isVisited ? 'heart' : 'heartOutline'}
          onPress={handlePress}
          size="40"
        />
      </Animated.View>
    </View>
  );
}

export default memo(VisitedToggle);
