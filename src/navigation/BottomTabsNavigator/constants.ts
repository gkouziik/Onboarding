import { TabParamList } from '@/navigation/RootNavigator/types.ts';
import { IconName } from '@/components/SVGResolver/icons.ts';

export const TAB_ICONS: Record<keyof TabParamList, IconName> = {
  Home: 'home',
  Visited: 'heart',
};
