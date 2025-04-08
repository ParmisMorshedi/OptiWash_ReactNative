import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrganizationsScreen from '../screens/OrganizationsScreen';
import OrganizationDetailsScreen from '../screens/OrganizationDetailsScreen';
import EditOrganizationScreen from '../screens/EditOrganizationScreen';

export type OrganizationStackParamList = {
  Organizations: undefined;
  OrganizationDetails: {
    id: number;
    name: string;
    carPlateNumbers: string[];
  };
  EditOrganization: { orgId: number };
};
const Stack = createNativeStackNavigator<OrganizationStackParamList>();


const OrganizationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Organizations" component={OrganizationsScreen} options={{ title: 'Organisationer' }} />
      <Stack.Screen name="OrganizationDetails" component={OrganizationDetailsScreen} options={{ title: 'Detaljer' }} />
      <Stack.Screen name="EditOrganization" component={EditOrganizationScreen} />

    </Stack.Navigator>
  );
};

export default OrganizationStack;
