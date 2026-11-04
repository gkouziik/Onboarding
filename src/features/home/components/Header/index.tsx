import React, { memo } from 'react';
import { View } from 'react-native';

import { SearchInput } from '@/features/home/components/SearchInput';
import { styles } from '@/features/home/components/Header/styles.ts';
import ThemePicker from '@/components/ThemePicker';
import LanguageToggle from '@/components/LanguageToggle';
import { useTranslation } from 'react-i18next';

type Props = {
  search: string;
  onSearchChange: (text: string) => void;
};

function Header({ search, onSearchChange }: Props) {
  const { t } = useTranslation();
  return (
    <View style={styles.row}>
      <View style={styles.search}>
        <SearchInput
          value={search}
          onChangeText={onSearchChange}
          placeholder={t('home.searchPlaceholder')}
        />
      </View>
      <LanguageToggle />
      <ThemePicker />
    </View>
  );
}

export default memo(Header);
