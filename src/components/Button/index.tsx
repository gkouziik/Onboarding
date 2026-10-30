import { Pressable, type PressableProps } from 'react-native';

import { ColorsKeys } from '@/theme/theme.ts';
import { styles } from '@/components/Button/styles.ts';
import { SvgResolver } from '@/components/SVGResolver';
import { AppText } from '@/components/AppText';
import { IconName } from '@/components/SVGResolver/types.ts';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends PressableProps {
  label: string;
  variant?: Variant;
  icon?: IconName;
}

const CONTENT_COLOR: Record<Variant, ColorsKeys> = {
  primary: 'brand',
  secondary: 'text',
  danger: 'borderStrong',
};

/** Text button. Used for Retry (ErrorView) and other text actions. */
export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  ...rest
}: ButtonProps) {
  styles.useVariants({ variant, disabled });

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      {...rest}
    >
      {icon ? (
        <SvgResolver name={icon} size={20} color={CONTENT_COLOR[variant]} />
      ) : null}
      <AppText variant="p1" color={CONTENT_COLOR[variant]}>
        {label}
      </AppText>
    </Pressable>
  );
}
