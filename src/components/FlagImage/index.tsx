import React, { useState } from 'react';
import { Image, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { styles } from '@/components/FlagImage/styles.ts';
import { flagSize } from '@/theme/sizes/flagSizes';

interface FlagImageProps {
  uri: string;
  /**
   *  Shown when the image is missing or fails to load.
   */
  emoji?: string;
  size?: keyof typeof flagSize;
}

/**
 * Country flag with an emoji fallback.
 * Used in list rows and the Detail header.
 */
export function FlagImage({ uri, emoji = '', size = 'sm' }: FlagImageProps) {
  const [failed, setFailed] = useState(!uri);
  styles.useVariants({ size });

  if (failed) {
    return (
      <View style={styles.flag} testID="flag-fallback">
        <AppText variant={size === 'lg' ? 'h1' : 'p1'}>{emoji}</AppText>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      onError={() => setFailed(true)}
      resizeMode="cover"
      accessibilityIgnoresInvertColors
      style={styles.flag}
      testID="flag-image"
    />
  );
}
