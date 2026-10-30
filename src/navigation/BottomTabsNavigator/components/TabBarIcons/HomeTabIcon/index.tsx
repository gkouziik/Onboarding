import React from 'react';

import { SvgResolver } from '@/components/SVGResolver';
import { IconProps } from '@/navigation/BottomTabsNavigator/components/TabBarIcons/types.ts';

export const HomeTabIcon = ({ focused }: IconProps) => (
  <SvgResolver
    name="home"
    size={24}
    color={focused ? 'borderStrong' : 'border'}
  />
);
