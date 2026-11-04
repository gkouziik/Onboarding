import React, { memo, useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { Divider } from '@/components/Divider';
import InfoRow from '@/components/InfoRow';
import { Card } from '@/components/Card';
import { styles } from '@/features/home/components/StatsPanel/styles.ts';
import { CountryStats } from '@/features/home/utils/computeStats.ts';
import { CONTINENTS } from '@/models/countries.ts';
import { SvgResolver } from '@/components/SVGResolver';
import { formatCompact } from '@/utils';

type Props = {
  stats: CountryStats;
};

function StatsPanel({ stats }: Props) {
  const [expanded, setExpanded] = useState(true);

  const toggle = useCallback(() => setExpanded(current => !current), []);

  return (
    <Card style={styles.card}>
      <Pressable onPress={toggle} style={styles.header} testID="stats-button">
        <View style={styles.headerText}>
          <AppText variant="h3">Stats</AppText>
          {!expanded && (
            <AppText variant="p3" color="text2">
              {`${stats.totalCountries} countries · ${formatCompact(
                stats.totalPopulation,
              )} people`}
            </AppText>
          )}
        </View>
        <View style={[styles.chevron, expanded && styles.chevronExpanded]}>
          <SvgResolver name="chevronRight" color="text2" />
        </View>
      </Pressable>

      {expanded && (
        <>
          <Divider />

          <View style={styles.section}>
            <InfoRow label="Countries" value={String(stats.totalCountries)} />
            <InfoRow
              label="World population"
              value={formatCompact(stats.totalPopulation)}
            />
            <InfoRow
              label="Average area"
              value={`${formatCompact(stats.averageArea)} km²`}
            />
          </View>

          <Divider />

          <View style={styles.section}>
            <AppText variant="h3" color="text2">
              Top 5 by population
            </AppText>
            {stats.topByPopulation.map((country, index) => (
              <InfoRow
                key={country.code}
                label={`${index + 1}. ${country.name}`}
                value={formatCompact(country.population)}
              />
            ))}
          </View>

          <Divider />

          <View style={styles.section}>
            <AppText variant="h3" color="text2">
              Countries by continent
            </AppText>
            {CONTINENTS.map(continent => (
              <InfoRow
                key={continent}
                label={continent}
                value={String(stats.countByContinent[continent])}
              />
            ))}
          </View>
        </>
      )}
    </Card>
  );
}

export default memo(StatsPanel);
