import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { selectAuth } from '@/store/auth/selectors';
import { authActions, PIN_LENGTH } from '@/store/auth/slices';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';

type Props = {
  onDone: () => void;
};

function SetPin({ onDone }: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { savingPin, error } = useAppSelector(selectAuth);

  const [firstPin, setFirstPin] = useState<string | null>(null);
  const [value, setValue] = useState('');
  const [mismatch, setMismatch] = useState(false);

  // Detect the saving -> saved transition
  const wasSaving = useRef(false);
  useEffect(() => {
    if (wasSaving.current && !savingPin && !error) {
      onDone();
    }
    wasSaving.current = savingPin;
  }, [savingPin, error, onDone]);

  const handleChange = useCallback(
    (text: string) => {
      const digits = text.replace(/\D/g, '');
      setValue(digits);
      if (digits.length < PIN_LENGTH) {
        return;
      }

      if (firstPin === null) {
        setFirstPin(digits);
        setMismatch(false);
      } else if (digits === firstPin) {
        dispatch(authActions.setPinRequested(digits));
      } else {
        setFirstPin(null);
        setMismatch(true);
      }
      setValue('');
    },
    [dispatch, firstPin],
  );

  return (
    <View style={styles.container}>
      <AppText variant="h2">
        {firstPin === null ? t('pin.selectPin') : t('pin.confirmPin')}
      </AppText>

      <TextInput
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        secureTextEntry
        maxLength={PIN_LENGTH}
        autoFocus
        editable={!savingPin}
        testID="set-pin-input"
        style={styles.input}
      />

      {mismatch && (
        <AppText style={styles.error}>PINs didn't match, try again</AppText>
      )}
      {error && <AppText style={styles.error}>{error}</AppText>}
    </View>
  );
}

export default SetPin;
