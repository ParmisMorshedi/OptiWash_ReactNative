import React, { useEffect, useState } from 'react';
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
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CarsStackParamList } from '../../navigation/types';
import API_URL from '../../../config';
import styles from '../../styles/Car/CarScreen.styles'; // 🔧 مسیر درست

type RouteParams = {
  EditCar: {
    carId: number;
  };
};

const EditCarScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'EditCar'>>();
  const navigation = useNavigation<NativeStackNavigationProp<CarsStackParamList>>();
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
        })
        .catch(() => {
          Alert.alert('Fel', 'Kunde inte hämta bilen.');
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
        })
      });

      if (!res.ok) {
        Alert.alert('❌ Fel', 'Något gick fel.');
        return;
      }

      Alert.alert('✅ Klart', 'Bilen uppdaterades!');
      navigation.navigate('CarsList', { updated: true });
    } catch {
      Alert.alert('❌ Fel', 'Något gick fel.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.label}>Redigera registreringsnummer:</Text>
        <TextInput
          style={styles.input}
          value={plateNumber}
          onChangeText={setPlateNumber}
        />

        <Text style={styles.label}>Scannad skylt (valfritt):</Text>
        <TextInput
          style={styles.input}
          value={scannedPlate}
          onChangeText={setScannedPlate}
        />

        <Button title="Spara ändringar" onPress={handleSave} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditCarScreen;
