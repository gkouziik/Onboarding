import { IconName } from '@/components/SVGResolver/types.ts';
import { ColorsKeys } from '@/theme/theme.ts';
import { Pressable, type PressableProps } from 'react-native';
import { iconSize } from '@/theme/sizes/iconSize';
import { styles } from '@/components/IconButton/styles.ts';
import { SvgResolver } from '@/components/SVGResolver';

interface IconButtonProps extends PressableProps {
  /**
   * The icon to be rendered within the button
   */
  icon: IconName;
  /**
   * on press callback to be called when user presses the button
   */
  onPress: () => void;
  /**
   * color that supported by theme
   */
  color?: ColorsKeys;
  /**
   * size of the icon as number, passed as size in SVGResolver {@see SVGResolver}
   */
  size?: keyof typeof iconSize;
  /**
   * boolean value that denotes if the button is disabled
   */
  disabled?: boolean;
  /**
   * the test id for rntl tests
   */
  testID?: string;
}

/**
 * Icon-only button with a 40x40 touch target
 */
export function IconButton({
  icon,
  onPress,
  color = 'text',
  size = '24',
  testID,
  disabled = false,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
      testID={testID}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <SvgResolver name={icon} size={size} color={color} />
    </Pressable>
  );
}
