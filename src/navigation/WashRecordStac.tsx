import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WashRecordsScreen from '../screens/WashRecordsScreen';
import AddWashRecordScreen from '../screens/AddWashRecordScreen';
import EditWashRecordScreen from '../screens/EditWashRecordScreen';

const Stack = createNativeStackNavigator();

const WashRecordStack = () => {
  return (
    <Stack.Navigator initialRouteName="WashRecords">
      <Stack.Screen name="WashRecords" component={WashRecordsScreen} />
      <Stack.Screen name="AddWashRecord" component={AddWashRecordScreen} />
      <Stack.Screen name="EditWashRecord" component={EditWashRecordScreen} />

    </Stack.Navigator>
  );
};

export default WashRecordStack;
