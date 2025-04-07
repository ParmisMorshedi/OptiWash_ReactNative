import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import API_URL from '../../config';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';



type RouteParams = {
  AddCar: {
    carId?: number;
  };
};

const AddCarScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, 'AddCar'>>();
  const { carId } = route.params || {};

  const [plateNumber, setPlateNumber] = useState('');
  const [scannedLicensePlate, setScannedLicensePlate] = useState('');
  const isEditing = !!carId;


  const carData = {
    id: carId,
    plateNumber,
    scannedLicensePlate: scannedLicensePlate || null,
  };
  

  useEffect(() => {
    if (carId) {
      const fetchCar = async () => {
        try {
          const res = await fetch(`${API_URL}/Cars/${carId}`);
          const data = await res.json();
          setPlateNumber(data.plateNumber);
          setScannedLicensePlate(data.scannedLicensePlate || '');
        } catch (error) {
          console.error(error);
          Alert.alert('Fel', 'Kunde inte hämta bilens data.');
        }
      };
      fetchCar();
    }
  }, [carId]);


  const handleAddCar = async () => {
    if (!plateNumber) {
      Alert.alert('Fel', 'Fyll i registreringsnumret');
      return;
    }

    const newCar = {
      plateNumber,
      scannedLicensePlate: scannedLicensePlate || null,
      washHistory: null,
    };

    const url = carId ? `${API_URL}/Cars/${carId}` : `${API_URL}/Cars`;
    const method = carId ? 'PUT' : 'POST';

     try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });


      if (!res.ok) throw new Error('Misslyckades att spara bilen');

      Alert.alert('✅ Klart', carId ? 'Bilen uppdaterades!' : 'Ny bil tillagd!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('❌ Fel', 'Något gick fel, försök igen.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Registreringsnummer:</Text>
      <TextInput
        style={styles.input}
        placeholder="ABC123"
        value={plateNumber}
        onChangeText={setPlateNumber}
      />

      <Text style={styles.label}>Scannad skylt (valfritt):</Text>
      <TextInput
        style={styles.input}
        placeholder="Scanned Plate"
        value={scannedLicensePlate}
        onChangeText={setScannedLicensePlate}
      />

      <Button title="Lägg till bil" onPress={handleAddCar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 5, borderRadius: 5 },
});

export default AddCarScreen;
