import { View } from 'react-native';

import { styles } from '@/components/ErrorView/styles.ts';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';

interface ErrorViewProps {
  /**
   * Title of error screen component when a full screen error occurs
   */
  title?: string;
  /**
   * message/subtitle/description of full screen error message
   * describes the issue
   */
  message?: string;
  /**
   * on retry callback to refetch when error occurs
   */
  onRetry: () => void;
}

/**
 * Error state with a retry action (faile fetch)
 */
export function ErrorView({
  title = 'Something went wrong',
  onRetry,
  message = 'Check your connection and try again.',
}: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <AppText variant="h3" style={styles.center}>
        {title}
      </AppText>
      <AppText color="text2" style={styles.center}>
        {message}
      </AppText>
      <Button label="Try again" onPress={onRetry} />
    </View>
  );
}
