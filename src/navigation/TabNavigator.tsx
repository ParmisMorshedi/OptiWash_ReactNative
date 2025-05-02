import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../auth/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CarsScreen from '../screens/Car/CarsScreens';
import CarsStack from './CarsStack';
import WashRecordsScreen from '../screens/WashRecordsScreen'; 
import OrganizationsScreen from '../screens/Organization/OrganizationsScreen';
import AddOrganizationsScreen from '../screens/Organization/AddOrganizationsScreen';
import OrganizationDetailsScreen from '../screens/Organization/OrganizationDetailsScreen';
import OrganizationStack from './OrganizationStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WashRecordStack from './WashRecordStac';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/types';
type Props = BottomTabScreenProps<RootTabParamList, 'Profile'>;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      <Tab.Screen name="Bil" component={CarsStack} />
      <Tab.Screen name="Tvättschema" component={WashRecordStack} /> 
      <Tab.Screen name="Organisationer" component={OrganizationStack} />
    </Tab.Navigator>
  );
}

