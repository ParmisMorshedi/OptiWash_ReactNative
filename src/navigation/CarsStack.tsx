
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarsScreen from '../screens/Car/CarsScreens';
import AddCarScreen from '../screens/Car/AddCarsScreens';
import AddWashRecordFromCarScreen from '../screens/AddWashRecordFromCarScreen';
import EditCarScreen from '../screens/Car/EditCarScreen';
import { CarsStackParamList } from '../navigation/types'; 
import EditWashRecordScreen from '../screens/EditWashRecordScreen';


const Stack = createNativeStackNavigator<CarsStackParamList>();

export default function CarsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CarsList" component={CarsScreen} />
      <Stack.Screen name="AddCar" component={AddCarScreen} />
      <Stack.Screen name="EditCar" component={EditCarScreen} />
      <Stack.Screen name="AddWashRecord" component={AddWashRecordFromCarScreen} />
      <Stack.Screen name="EditWashRecord" component={EditWashRecordScreen} />

      </Stack.Navigator>
  );
}


