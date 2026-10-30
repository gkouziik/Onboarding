import { useUnistyles } from 'react-native-unistyles';

import { ThemeColors } from '@/theme/theme.ts';
import { icons } from '@/components/SVGResolver/icons.ts';
import { type IconName } from '@/components/SVGResolver/types.ts';

type ThemeColorKey = keyof ThemeColors;
type IconSizeKey = keyof ReturnType<
  typeof useUnistyles
>['theme']['sizes']['iconSize'];

type Props = {
  /**
   * the icon name , derived by the svgs of the app {@see IconName}
   */
  name: IconName;
  /**
   *
   */
  color?: ThemeColorKey;
  /**
   * the size of the icon derived by the supported icon sizes of the app's theme
   */
  size?: IconSizeKey | number;
  /**
   * width of the svg , when size provided , width will inherit that value if no specific width is provided
   */
  width?: number;
  /**
   * height of the svg , when size provided , height will inherit that value if no specific height is provided
   */
  height?: number;
  /**
   * testID for rntl
   */
  testID?: string;
};

/**
 * Component that renders the svg icons of the app as react components.
 * size (width, height) and color of the icons can be customized according
 * to the supported theme's values.
 */
export function SvgResolver({
  name,
  color = 'text' as ThemeColorKey,
  size = 24,
  width,
  height,
  testID,
}: Props) {
  /**
   * A leaf component with no children, wrapping a third-party view. react-native-svg counts as third-party here,
   * because Unistyles can’t update its color prop through a stylesheet.
   * Its own small component, not a screen or root component, so a theme change re-renders only the icon itself.
   */
  const { theme } = useUnistyles();
  const Svg = icons[name];

  const resolvedSize =
    typeof size === 'number' ? size : (theme.sizes.iconSize[size] as number);

  return (
    <Svg
      width={width ?? resolvedSize}
      height={height ?? resolvedSize}
      color={theme.colors[color] as string}
      testID={testID ?? `icon-${name}`}
    />
  );
}
