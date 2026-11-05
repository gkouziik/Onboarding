import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator/types.ts';
import SetPin from '@/screens/Pin/components/SetPin';

type Props = NativeStackScreenProps<RootStackParamList, 'Pin'>;

export function PinRoute({ navigation }: Props) {
  return <SetPin onDone={navigation.goBack} />;
}
