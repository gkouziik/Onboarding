import React, { memo, useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';

import { AppText } from '@/components/AppText';
import { IconButton } from '@/components/IconButton';
import { THEME_OPTIONS } from '@/components/ThemePicker/constants.ts';
import { ThemeName } from '@/theme/theme.ts';
import { styles } from './styles.ts';

function ThemePicker() {
  const [open, setOpen] = useState(false);

  // Non-reactive read: only refreshed when this component re-renders
  const currentTheme = UnistylesRuntime.themeName as ThemeName;

  const toggle = useCallback(() => setOpen(prev => !prev), []);

  const handleSelect = useCallback((name: ThemeName) => {
    /**
     * following does not re-render the component , thus the radio button is not updated
     */
    UnistylesRuntime.setTheme(name);
    /**
     * When we close the drop-down we set the state and thus we re-render the component
     */
    setOpen(false);
  }, []);

  return (
    <View style={styles.anchor}>
      <IconButton
        icon="palette"
        accessibilityLabel="Change theme"
        onPress={toggle}
      />

      {open && (
        <View style={styles.dropdown}>
          {THEME_OPTIONS.map(option => {
            const selected = option.name === currentTheme;
            return (
              <Pressable
                key={option.name}
                onPress={() => handleSelect(option.name)}
                style={styles.option}
              >
                <View
                  style={[styles.radio, selected && styles.radioSelected]}
                />
                <AppText>{option.label}</AppText>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

export default memo(ThemePicker);
