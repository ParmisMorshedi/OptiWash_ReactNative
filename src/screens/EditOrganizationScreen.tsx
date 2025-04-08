import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import API_URL from '../../config';

type RouteParams = {
  EditOrganization: {
    orgId: number;
  };
};

const EditOrganizationScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'EditOrganization'>>();
  const navigation = useNavigation<any>();
  const { orgId } = route.params;

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const res = await fetch(`${API_URL}/Organizations/${orgId}`);
        const data = await res.json();
        setName(data.name);
        setLocation(data.location);
      } catch (err) {
        Alert.alert('Fel', 'Kunde inte hämta organisationen.');
      }
    };

    fetchOrganization();
  }, [orgId]);

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/Organizations/${orgId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orgId, name, location }),
      });

      if (!res.ok) throw new Error();

      Alert.alert('✅ Uppdaterad', 'Organisationen uppdaterades!');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Fel', 'Kunde inte uppdatera organisationen.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redigera organisation</Text>

      <Text style={styles.label}>Namn:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Plats:</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} />

      <Button title="Spara ändringar" onPress={handleSave} />
    </View>
  );
};

export default EditOrganizationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});
