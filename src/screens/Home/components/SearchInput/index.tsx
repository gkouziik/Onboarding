import { useCallback, useMemo } from 'react';
import { TextInputProps, View } from 'react-native';

import { SvgResolver } from '@/components/SVGResolver';
import { IconButton } from '@/components/IconButton';
import { ThemedTextInput } from '@/screens/Home/components/SearchInput/components/ThemedTextInput';
import { styles } from '@/screens/Home/components/SearchInput/styles.ts';

/**
 * Controlled search field with a clear button that shows only when there is text.
 */
export function SearchInput({
  value,
  onChangeText,
  placeholder = 'Search',
  testID,
  style,
}: TextInputProps) {
  const onIconButtonPress = useCallback(() => {
    onChangeText && onChangeText('');
  }, [onChangeText]);

  const searchInputStyles = useMemo(() => [styles.input, style], [style]);

  return (
    <View style={styles.container}>
      <SvgResolver name="search" size={20} color="text2" />
      <ThemedTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        style={searchInputStyles}
        testID={testID}
      />
      {value && value.length > 0 ? (
        <IconButton
          icon="close"
          testID="clear-search"
          size="20"
          color="text2"
          onPress={onIconButtonPress}
        />
      ) : null}
    </View>
  );
}
