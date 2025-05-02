import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import 'react-native-gesture-handler';


const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigator /> 
    </GestureHandlerRootView>
  );
};

export default App;
