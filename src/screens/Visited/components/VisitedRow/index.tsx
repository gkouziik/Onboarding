import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SharedValue } from 'react-native-reanimated';

import CountryListItem from '@/components/CountryListItem';
import { IconButton } from '@/components/IconButton';
import { CountrySummary } from '@/models/countries.ts';
import { ACTION_WIDTH, styles } from './styles.ts';
import RemoveAction from '@/screens/Visited/components/VisitedRow/components/RemoveAction';

type Props = {
  country: CountrySummary;
  onPress: (code: string) => void;
  onRemove: (code: string) => void;
};

/**
 * A Visited country row: opens the detail on press, swipe left to remove,
 * with a remove button kept as the accessible / discoverable fallback.
 */
function VisitedRow({ country, onPress, onRemove }: Props) {
  const handleRemove = useCallback(
    () => onRemove(country.code),
    [onRemove, country.code],
  );

  const renderRightActions = useCallback(
    (_progress: SharedValue<number>, drag: SharedValue<number>) => (
      <RemoveAction drag={drag} />
    ),
    [],
  );

  return (
    <ReanimatedSwipeable
      friction={2}
      rightThreshold={ACTION_WIDTH}
      overshootRight={false}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={handleRemove}
      containerStyle={styles.container}
    >
      <View style={styles.rowBackground}>
        <CountryListItem
          country={country}
          onPress={onPress}
          right={
            <IconButton
              testID={`${country.name}-remove-button`}
              icon="delete"
              accessibilityLabel={`Remove ${country.name} from visited`}
              onPress={handleRemove}
            />
          }
        />
      </View>
    </ReanimatedSwipeable>
  );
}

export default memo(VisitedRow);
