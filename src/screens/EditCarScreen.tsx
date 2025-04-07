import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import API_URL from '../../config';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CarsStackParamList } from '../navigation/types';  


type RouteParams = {
    EditCar: {
      carId: number;
    };
  };
   
const EditCarScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'EditCar'>>();
  const navigation = useNavigation<NativeStackNavigationProp<CarsStackParamList>>(); // ✅ منتقل شده داخل تابع

  const { carId } = route.params || {};

  const [plateNumber, setPlateNumber] = useState('');
  const [scannedPlate, setScannedPlate] = useState('');

  useEffect(() => {
    if (carId) {
      fetch(`${API_URL}/Cars/${carId}`)
        .then(res => res.json())
        .then(data => {
          setPlateNumber(data.plateNumber);
          setScannedPlate(data.scannedLicensePlate || '');
        });
    }
  }, [carId]);

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/Cars/${carId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: carId,
            plateNumber,
            scannedLicensePlate: scannedPlate
          }),
          
      });    
const resText = await res.text();
console.log('🧾 Server response:', res.status, resText);
      
if (!res.ok) {
    Alert.alert('❌ Fel', 'Något gick fel.');
    return;
  }
  
  Alert.alert('✅ Klart', 'Bilen uppdaterades!');

  
  navigation.navigate('CarsList', { updated: true });

    } catch (e) {
      console.error(e);
      Alert.alert('Fel', 'Något gick fel.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Redigera Registreringsnummer:</Text>
      <TextInput
        style={styles.input}
        value={plateNumber}
        onChangeText={setPlateNumber}
      />
      <Text>Scannad skylt (valfritt):</Text>
      <TextInput
        style={styles.input}
        value={scannedPlate}
        onChangeText={setScannedPlate}
      />
      <Button title="Spara ändringar" onPress={handleSave} />
    </View>
  );
};

export default EditCarScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});
