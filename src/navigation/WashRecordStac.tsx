import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WashRecordsScreen from '../screens/WashRecord/WashRecordsScreen';
import AddWashRecordScreen from '../screens/WashRecord/AddWashRecordScreen';
import EditWashRecordScreen from '../screens/WashRecord/EditWashRecordScreen';
import DeleteWashRecordScreen from '../screens/WashRecord/DeleteWashRecordScreen';

const Stack = createNativeStackNavigator();

const WashRecordStack = () => {
  return (
    <Stack.Navigator initialRouteName="WashRecords"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WashRecords" component={WashRecordsScreen}  />
      <Stack.Screen name="AddWashRecord" component={AddWashRecordScreen} />
      <Stack.Screen name="EditWashRecord" component={EditWashRecordScreen} />
      <Stack.Screen name="DeleteWashRecord" component={DeleteWashRecordScreen} />


    </Stack.Navigator>
  );
};

export default WashRecordStack;
