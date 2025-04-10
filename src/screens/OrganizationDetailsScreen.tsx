import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import API_URL from '../../config';
import { useNavigation } from '@react-navigation/native';
const navigation = useNavigation();

type Params = {
  id: number;
  name: string;
  carPlateNumbers: string[];
  city?: string; 
};

const OrganizationDetailsScreen = () => {
  const route = useRoute<RouteProp<Record<string, Params>, string>>();
  const { name, carPlateNumbers, city } = route.params;

  const [switchStates, setSwitchStates] = useState<{ [plate: string]: boolean }>(
    Object.fromEntries(carPlateNumbers.map((plate) => [plate, false]))
  );

  const handleSwitchChange = async (plate: string) => {
    const updatedState = !switchStates[plate];
    setSwitchStates((prev) => ({ ...prev, [plate]: updatedState }));
  
    try {
      console.log("🔎 Fetching car with plate:", plate);
      const res = await fetch(`${API_URL}/Cars/plate/${plate}`);
      const carText = await res.text();
      console.log("🚙 Response Text:", carText);
      const car = carText ? JSON.parse(carText) : null;
  
      if (!car || !car.id) {
        Alert.alert("Fel", "Bilen kunde inte hittas.");
        return;
      }
  
      const carId = car.id;
  
      const payload = {
        carId: carId,
        washDate: new Date().toISOString(),
        interiorCleaned: true,
        exteriorCleaned: true,
        notes: '',
        status: 2,
        userId: '8fdbab80-bb3a-4388-b340-0f7f05058421',
      };
  
      console.log("📤 Posting wash record:", payload);
  
      const postRes = await fetch(`${API_URL}/WashRecords`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (postRes.ok) {
        Alert.alert('✅ Klar', `Tvätt registrerades för ${plate}`, [
          {
            text: 'OK',
            onPress: () => navigation.goBack()  
          }
        ]);
      } else {
        const errorText = await postRes.text();
        console.error("❌ POST failed:", errorText);
        Alert.alert('Fel', 'Kunde inte registrera tvätten.');
        setSwitchStates((prev) => ({ ...prev, [plate]: false }));
      }
    } catch (error) {
      console.error('🚨 Error i handleSwitchChange:', error);
      Alert.alert('Fel', 'Något gick fel.');
      setSwitchStates((prev) => ({ ...prev, [plate]: false }));
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🚧 {name}</Text>
      <Text style={styles.sub}>📍 {city}</Text>
      <Text style={styles.sub}>📋 Lista på bilar</Text>

      <FlatList
        data={carPlateNumbers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          
          <View style={styles.item}>
            <Text style={styles.plate}>🚗 {item}</Text>
            <Text>🧽 Typ av tvätt: Invändig & Utvändig</Text>
            <View style={styles.switchRow}>
              <Text>✔️ Klar?</Text>
              <Switch
                value={switchStates[item]}
                onValueChange={() =>{
                  console.log("🖱 Switch tapped for:", item);

                   handleSwitchChange(item)}}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default OrganizationDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  sub: { fontSize: 16, marginBottom: 10 },
  item: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  plate: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
