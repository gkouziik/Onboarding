import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUnistyles } from 'react-native-unistyles';

import { RootStackParamList } from '@/navigation/RootNavigator/types.ts';
import { CountryDetails } from '@/features/countryDetails';
import { TabNavigator } from '@/navigation/BottomTabsNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  // according to documentation https://unistyl.es/v3/references/use-unistyles/
  const { theme } = useUnistyles();

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: theme.colors.bg },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CountryDetail"
        component={CountryDetails}
        options={{ headerShown: true, headerBackTitle: 'Back', title: '' }}
      />
    </Stack.Navigator>
  );
}
