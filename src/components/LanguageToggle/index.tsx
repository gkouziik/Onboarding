import React, { memo, useCallback } from 'react';
import { View } from 'react-native';

import Chip from '@/components/Chip';
import type { Language } from '@/i18n';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { selectLanguage } from '@/store/selectors/settingsSelectors.ts';
import { setLanguage } from '@/store/slices/settings';

import { styles } from './styles.ts';

const OPTIONS: { language: Language; label: string }[] = [
  { language: 'en', label: 'EN' },
  { language: 'el', label: 'ΕΛ' },
];

/** EN | ΕΛ language switch. */
function LanguageToggle() {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectLanguage);

  const handleSelect = useCallback(
    (language: Language) => dispatch(setLanguage(language)),
    [dispatch],
  );

  return (
    <View style={styles.row}>
      {OPTIONS.map(({ language, label }) => (
        <Chip
          testID={label}
          key={language}
          label={label}
          selected={language === current}
          onPress={() => handleSelect(language)}
        />
      ))}
    </View>
  );
}

export default memo(LanguageToggle);
