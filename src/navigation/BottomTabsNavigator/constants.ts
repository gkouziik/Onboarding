import { TabParamList } from '@/navigation/RootNavigator/types.ts';
import { type IconName } from '@/components/SVGResolver/types.ts';

export const TAB_ICONS: Record<keyof TabParamList, IconName> = {
  Home: 'home',
  Visited: 'heart',
};
