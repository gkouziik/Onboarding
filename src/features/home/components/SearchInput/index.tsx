import { useCallback } from 'react';
import { TextInputProps, View } from 'react-native';

import { SvgResolver } from '@/components/SVGResolver';
import { IconButton } from '@/components/IconButton';
import { ThemedTextInput } from '@/features/home/components/SearchInput/components/ThemedTextInput';
import { styles } from '@/features/home/components/SearchInput/styles.ts';

/**
 * Controlled search field with a clear button that shows only when there is text.
 */
export function SearchInput({
  value,
  onChangeText,
  placeholder = 'Search',
  testID,
}: TextInputProps) {
  const onIconButtonPress = useCallback(() => {
    onChangeText && onChangeText('');
  }, [onChangeText]);

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
        style={styles.input}
        testID={testID}
      />
      {value && value.length > 0 ? (
        <IconButton
          icon="close"
          size="20"
          color="text2"
          accessibilityLabel="Clear search"
          onPress={onIconButtonPress}
        />
      ) : null}
    </View>
  );
}
