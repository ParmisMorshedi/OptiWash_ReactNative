import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrganizationsScreen from '../screens/OrganizationsScreen';
import OrganizationDetailsScreen from '../screens/OrganizationDetailsScreen';

export type OrganizationStackParamList = {
  Organizations: undefined;
  OrganizationDetails: {
    id: number;
    name: string;
    carPlateNumbers: string[];
  };
};
const Stack = createNativeStackNavigator<OrganizationStackParamList>();


const OrganizationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Organizations" component={OrganizationsScreen} options={{ title: 'Organisationer' }} />
      <Stack.Screen name="OrganizationDetails" component={OrganizationDetailsScreen} options={{ title: 'Detaljer' }} />
    </Stack.Navigator>
  );
};

export default OrganizationStack;
