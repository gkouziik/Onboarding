import React, { memo, useCallback } from 'react';
import { View } from 'react-native';

import { IconButton } from '@/components/IconButton';
import { CountryDetail } from '@/models/countries.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { selectIsVisited } from '@/store/selectors/visitedSelectors.ts';
import { toggleVisited } from '@/store/slices/visited';
import { styles } from './styles.ts';

type Props = {
  country: CountryDetail;
};

function VisitedToggle({ country }: Props) {
  const dispatch = useAppDispatch();
  const isVisited = useAppSelector(state =>
    selectIsVisited(state, country.code),
  );

  const handlePress = useCallback(() => {
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
  }, [country, dispatch]);

  return (
    <View style={styles.toggleButtonContainer}>
      <IconButton
        icon={isVisited ? 'heart' : 'heartOutline'}
        onPress={handlePress}
        size="40"
      />
    </View>
  );
}

export default memo(VisitedToggle);
