import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CarsScreen from '../screens/CarsScreens';
import AddCarScreen from '../screens/AddCarsScreens';
import WashRecordsScreen from '../screens/WashRecordsScreen'; 
import AddWashRecordScreen from '../screens/AddWashRecordScreen';
import OrganizationsScreen from '../screens/OrganizationsScreen';
import AddOrganizationsScreen from '../screens/AddOrganizationsScreen';
import OrganizationDetailsScreen from '../screens/OrganizationDetailsScreen';
import OrganizationStack from './OrganizationStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      <Tab.Screen name="Cars" component={CarsScreen} />
      <Tab.Screen name="Add Car" component={AddCarScreen} />
      <Tab.Screen name="Tavättschema" component={WashRecordsScreen} />
      <Tab.Screen name="Ny Tvätt" component={AddWashRecordScreen} />
      <Tab.Screen name="Organisationer" component={OrganizationStack} />
      <Tab.Screen name="Ny Organisation" component={AddOrganizationsScreen} />


    </Tab.Navigator>
  );
}
