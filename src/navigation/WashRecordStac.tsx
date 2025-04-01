import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WashRecordsScreen from '../screens/WashRecordsScreen';
import AddWashRecordScreen from '../screens/AddWashRecordScreen';

const Stack = createNativeStackNavigator();

const WashRecordStack = () => {
  return (
    <Stack.Navigator initialRouteName="WashRecords">
      <Stack.Screen name="WashRecords" component={WashRecordsScreen} />
      <Stack.Screen name="AddWashRecord" component={AddWashRecordScreen} />
    </Stack.Navigator>
  );
};

export default WashRecordStack;
