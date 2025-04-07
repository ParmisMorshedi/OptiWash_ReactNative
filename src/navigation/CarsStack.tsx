
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarsScreen from '../screens/CarsScreens';
import AddCarScreen from '../screens/AddCarsScreens';
import AddWashRecordFromCarScreen from '../screens/AddWashRecordFromCarScreen';

const Stack = createNativeStackNavigator();

export default function CarsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CarsList" component={CarsScreen} />
      <Stack.Screen name="AddCar" component={AddCarScreen} />
      <Stack.Screen name="AddWashRecord" component={AddWashRecordFromCarScreen} />
      </Stack.Navigator>
  );
}


