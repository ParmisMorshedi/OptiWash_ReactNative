import React from 'react';
import AddWashRecordScreen from '../screens/AddWashRecordScreen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AddWashRecordFromCarScreenRouteProp = RouteProp<{ NewAddWashRecord: { carId: number } }, 'NewAddWashRecord'>;
type AddWashRecordFromCarScreenNavigationProp = NativeStackNavigationProp<{ NewAddWashRecord: { carId: number } }, 'NewAddWashRecord'>;

const AddWashRecordFromCarScreen = () => {
  const route = useRoute<AddWashRecordFromCarScreenRouteProp>(); 
  const { carId } = route.params; 

  return <AddWashRecordScreen carId={carId} />;
};

export default AddWashRecordFromCarScreen;
