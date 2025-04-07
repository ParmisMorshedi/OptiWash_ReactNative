import React from 'react';
import AddWashRecordScreen from './AddWashRecordScreen';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

type RouteParams = {
  NewAddWashRecord: {
    carId: number;
  };
};

const AddWashRecordFromCarScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'NewAddWashRecord'>>();
  const { carId } = route.params;

  return <AddWashRecordScreen carId={carId} />;
};

export default AddWashRecordFromCarScreen;
