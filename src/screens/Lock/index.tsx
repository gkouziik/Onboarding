import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { selectAuth } from '@/store/auth/selectors';
import { authActions, PIN_LENGTH } from '@/store/auth/slices';
import { styles } from './styles';
import { biometryLabel } from '@/screens/Lock/utils.ts';

export function LockScreen() {
  const dispatch = useAppDispatch();
  const { biometryType, error } = useAppSelector(selectAuth);
  const [pin, setPin] = useState('');

  const tryBiometrics = useCallback(() => {
    dispatch(authActions.unlockWithBiometricsRequested());
  }, [dispatch]);

  // Prompt biometrics automatically when the Lock screen appears
  useEffect(() => {
    if (biometryType) {
      tryBiometrics();
    }
  }, [biometryType, tryBiometrics]);

  const handleChange = useCallback(
    (text: string) => {
      const digits = text.replace(/\D/g, '');
      setPin(digits);
      if (digits.length === PIN_LENGTH) {
        dispatch(authActions.unlockWithPinRequested(digits));
        setPin('');
      }
    },
    [dispatch],
  );

  return (
    <View style={styles.overlay}>
      <AppText variant="h2">Enter PIN</AppText>

      <TextInput
        value={pin}
        onChangeText={handleChange}
        keyboardType="number-pad"
        secureTextEntry
        maxLength={PIN_LENGTH}
        autoFocus={!biometryType}
        accessibilityLabel="PIN"
        testID="lock-pin-input"
        style={styles.input}
      />

      {error && <AppText style={styles.error}>{error}</AppText>}

      {biometryType && (
        <Pressable
          onPress={tryBiometrics}
          accessibilityRole="button"
          style={styles.biometricButton}
        >
          <AppText>Use {biometryLabel(biometryType)}</AppText>
        </Pressable>
      )}
    </View>
  );
}
