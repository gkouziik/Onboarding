import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useUnistyles } from 'react-native-unistyles';

import { TabParamList } from '@/navigation/RootNavigator/types.ts';
import { Home } from '@/features/home';
import { Visited } from '@/features/visited';
import { HomeTabIcon } from '@/navigation/BottomTabsNavigator/components/TabBarIcons/HomeTabIcon';
import { VisitedTabIcon } from '@/navigation/BottomTabsNavigator/components/TabBarIcons/VisitedTabIcon';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  // according to documentation https://unistyl.es/v3/references/use-unistyles/
  const { theme } = useUnistyles();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.text,
        headerTitleStyle: { fontFamily: theme.typography.fonts.bold },
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.borderStrong,
        tabBarInactiveTintColor: theme.colors.border,
        tabBarLabelStyle: { fontFamily: theme.typography.fonts.regular },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, tabBarIcon: HomeTabIcon }}
      />
      <Tab.Screen
        name="Visited"
        component={Visited}
        options={{ headerShown: false, tabBarIcon: VisitedTabIcon }}
      />
    </Tab.Navigator>
  );
}
