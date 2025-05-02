import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddOrganizationsScreen from '../screens/Organization/AddOrganizationsScreen';
import OrganizationsScreen from '../screens/Organization/OrganizationsScreen';
import OrganizationDetailsScreen from '../screens/Organization/OrganizationDetailsScreen';
import EditOrganizationScreen from '../screens/Organization/EditOrganizationScreen';

export type OrganizationStackParamList = {
  Organizations: undefined;
  OrganizationDetails: {
    id: number;
    name: string;
    city: string;
    carPlateNumbers: string[];
    
  };
  EditOrganization: { orgId: number };
  AddOrganization: undefined;
};
const Stack = createNativeStackNavigator<OrganizationStackParamList>();


const OrganizationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Organizations" component={OrganizationsScreen} options={{ title: 'Organisationer' }} />
      <Stack.Screen name="AddOrganization" component={AddOrganizationsScreen} options={{ title: 'Lägg till organisation' }}/>
      <Stack.Screen name="OrganizationDetails" component={OrganizationDetailsScreen} options={{ title: 'Detaljer' }} />
      <Stack.Screen name="EditOrganization" component={EditOrganizationScreen} />

    </Stack.Navigator>
  );
};

export default OrganizationStack;
