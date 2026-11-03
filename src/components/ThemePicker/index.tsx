import React, { memo, useCallback, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';

import { AppText } from '@/components/AppText';
import { IconButton } from '@/components/IconButton';
import { styles } from './styles.ts';
import { THEME_OPTIONS } from '@/components/ThemePicker/constants.ts';
import { ThemeName } from '@/theme/theme.ts';

function ThemePicker() {
  const [open, setOpen] = useState(false);

  const currentTheme = UnistylesRuntime.themeName as ThemeName;

  const openPicker = useCallback(() => setOpen(true), []);
  const closePicker = useCallback(() => setOpen(false), []);

  const handleSelect = useCallback((name: ThemeName) => {
    UnistylesRuntime.setTheme(name);
    setOpen(false);
  }, []);

  return (
    <>
      <IconButton
        icon="palette"
        accessibilityLabel="Change theme"
        onPress={openPicker}
      />

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={closePicker}
      >
        <Pressable style={styles.backdrop} onPress={closePicker}>
          <View style={styles.sheet} onStartShouldSetResponder={() => true}>
            <AppText variant="h3">Theme</AppText>

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
        </Pressable>
      </Modal>
    </>
  );
}

export default memo(ThemePicker);
