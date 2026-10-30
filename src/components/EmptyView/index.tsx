import { IconName } from '@/components/SVGResolver/types.ts';
import { View } from 'react-native';
import { styles } from '@/components/EmptyView/styles.ts';
import { SvgResolver } from '@/components/SVGResolver';
import { AppText } from '@/components/AppText';

interface EmptyViewProps {
  /**
   * Title of the Empty screen
   */
  title: string;
  /**
   * potential subtitle/description
   */
  message?: string;
  /**
   * if an icon is rendered above title
   */
  icon?: IconName;
}

/**
 * Empty View State component rendered in all Screens when no results are found
 */
export function EmptyView({ title, message, icon }: EmptyViewProps) {
  return (
    <View style={styles.container}>
      {icon ? <SvgResolver name={icon} size={48} color="text2" /> : null}
      <AppText variant="h3" style={styles.center}>
        {title}
      </AppText>
      {message ? (
        <AppText color="text2" style={styles.center}>
          {message}
        </AppText>
      ) : null}
    </View>
  );
}
