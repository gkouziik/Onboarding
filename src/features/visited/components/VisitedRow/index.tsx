import React, { memo, useCallback } from 'react';

import CountryListItem from '@/components/CountryListItem';
import { IconButton } from '@/components/IconButton';
import { CountrySummary } from '@/models/countries.ts';

type Props = {
  country: CountrySummary;
  onPress: (code: string) => void;
  onRemove: (code: string) => void;
};

/**
 *  A visited country row: opens the detail on press, with a remove button on the right.
 */
function VisitedRow({ country, onPress, onRemove }: Props) {
  const handleRemove = useCallback(
    () => onRemove(country.code),
    [onRemove, country.code],
  );

  return (
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
  );
}

export default memo(VisitedRow);
