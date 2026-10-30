import React from 'react';

import { SvgResolver } from '@/components/SVGResolver';
import { IconProps } from '@/navigation/BottomTabsNavigator/components/TabBarIcons/types.ts';

export const VisitedTabIcon = ({ focused }: IconProps) => (
  <SvgResolver
    name="heart"
    size={24}
    color={focused ? 'borderStrong' : 'border'}
  />
);
