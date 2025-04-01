import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import API_URL from '../../config';

const AddOrganizationsScreen = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [carPlate, setCarPlate] = useState('');

  const handleSubmit = async () => {
    if (!name || !location || !carPlate) {
      Alert.alert('Fel', 'Fyll i alla fält.');
      return;
    }

    const newOrg = {
      name,
      location,
      carPlateNumbers: [carPlate],
    };

    try {
      const response = await fetch(`${API_URL}/Organizations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrg),
      });

      if (response.ok) {
        Alert.alert('Succé', 'Organisationen har lagts till!');
        setName('');
        setLocation('');
        setCarPlate('');
      } else {
        Alert.alert('Fel', 'Kunde inte spara organisationen.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Fel', 'Något gick fel.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lägg till organisation</Text>

      <Text style={styles.label}>Namn</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Plats</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Registreringsnummer</Text>
      <TextInput
        style={styles.input}
        value={carPlate}
        onChangeText={setCarPlate}
        autoCapitalize="characters"
        maxLength={6}
      />

      <Button title="Lägg till organisation" onPress={handleSubmit} />
    </View>
  );
};

export default AddOrganizationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    marginTop: 15,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
});
