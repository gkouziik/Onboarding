import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { SearchInput } from '@/screens/Home/components/SearchInput';
import { styles } from '@/screens/Home/components/Header/styles.ts';
import ThemePicker from '@/components/ThemePicker';
import LanguageToggle from '@/components/LanguageToggle';
import { useTranslation } from 'react-i18next';
import { selectHasPin } from '@/store/auth/selectors';
import { RootStackParamList } from '@/navigation/RootNavigator/types.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { IconButton } from '@/components/IconButton';

type Props = {
  search: string;
  onSearchChange: (text: string) => void;
};

function Header({ search, onSearchChange }: Props) {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const hasPin = useAppSelector(selectHasPin);

  const onLockPress = useCallback(() => {
    navigation.navigate('Pin');
  }, [navigation]);

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
      <IconButton
        icon="lock"
        accessibilityLabel={hasPin ? 'Change PIN' : 'Set PIN'}
        onPress={onLockPress}
      />
      <ThemePicker />
    </View>
  );
}

export default memo(Header);
