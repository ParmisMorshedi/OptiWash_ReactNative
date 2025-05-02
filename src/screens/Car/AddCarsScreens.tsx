import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import API_URL from '../../../config';
import styles from '../../styles/Car/CarScreen.styles';

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

  useEffect(() => {
    if (carId) {
      const fetchCar = async () => {
        try {
          const res = await fetch(`${API_URL}/Cars/${carId}`);
          const data = await res.json();
          setPlateNumber(data.plateNumber);
          setScannedLicensePlate(data.scannedLicensePlate || '');
        } catch (error) {
          Alert.alert('Fel', 'Kunde inte hämta bilens data.');
        }
      };
      fetchCar();
    }
  }, [carId]);

  const handleSubmit = async () => {
    if (!plateNumber) {
      Alert.alert('Fel', 'Fyll i registreringsnumret');
      return;
    }

    const payload = {
      id: carId,
      plateNumber,
      scannedLicensePlate: scannedLicensePlate || null,
      washHistory: null
    };

    const url = carId ? `${API_URL}/Cars/${carId}` : `${API_URL}/Cars`;
    const method = carId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error();

      Alert.alert(
        '✅ Klart',
        carId ? 'Bilen uppdaterades!' : 'Ny bil tillagd!'
      );
      navigation.navigate('CarsList', { updated: true });
    } catch {
      Alert.alert('❌ Fel', 'Något gick fel, försök igen.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
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

        <Button
          title={carId ? 'Spara ändringar' : 'Lägg till bil'}
          onPress={handleSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddCarScreen;
