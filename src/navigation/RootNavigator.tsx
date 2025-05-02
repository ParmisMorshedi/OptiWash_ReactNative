import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStack';
import TabNavigator from './TabNavigator';
import { navigationRef } from './navigationRef';


export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      console.log("TOKEN CHECK:", token);
      setIsLoggedIn(!!token);
    };
  
    const interval = setInterval(checkToken, 1000); 
  
    return () => clearInterval(interval);
  }, []);
  
  return (
    <NavigationContainer ref={navigationRef}> 
      {isLoggedIn ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
  
}