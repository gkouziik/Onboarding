import React, { memo } from 'react';
import { View } from 'react-native';

import InfoRow from '@/components/InfoRow';
import { CountryDetail } from '@/models/countries.ts';
import { Card } from '@/components/Card';
import formatCurrency, { formatCompact } from '@/utils';
import { styles } from './styles.ts';

type Props = {
  country: CountryDetail;
};

function CountryProfile({ country }: Props) {
  return (
    <View style={styles.container}>
      <Card title="Overview">
        <InfoRow label="Capital" value={country.capitals} />
        <InfoRow label="Region" value={country.region} />
        <InfoRow label="Subregion" value={country.subregion} />
      </Card>

      <Card title="Numbers">
        <InfoRow label="Population" value={formatCompact(country.population)} />
        <InfoRow label="Area" value={`${formatCompact(country.area)} km²`} />
      </Card>

      <Card title="Culture">
        <InfoRow label="Languages" value={country.languages} />
        <InfoRow
          label="Currencies"
          value={country.currencies.map(formatCurrency)}
        />
      </Card>
    </View>
  );
}

export default memo(CountryProfile);
