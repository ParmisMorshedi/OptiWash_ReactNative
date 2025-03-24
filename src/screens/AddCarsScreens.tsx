import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import API_URL from '../../config';

const AddCarScreen = ({ navigation }: { navigation: any }) => {
  const [plateNumber, setPlateNumber] = useState('');
  const [scannedLicensePlate, setScannedLicensePlate] = useState('');

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

    try {
      const response = await fetch(`${API_URL}/Cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
      });

      if (!response.ok) throw new Error('Misslyckades att lägga till bilen');

      Alert.alert('✅ Lyckades', 'Bilen har lagts till!');
      navigation.goBack(); // Gå tillbaka till föregående skärm
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
