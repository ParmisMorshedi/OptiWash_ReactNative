import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type Params = {
  id: number;
  name: string;
  carPlateNumbers: string[];
  city?: string;
};

const OrganizationDetailsScreen = () => {
  const route = useRoute<RouteProp<Record<string, Params>, string>>();
  const { name, carPlateNumbers, city } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏢 {name}</Text>
      {city && <Text style={styles.sub}>📍 {city}</Text>}
      <Text style={styles.sub}>🚗 Lista på bilar:</Text>

      <FlatList
        data={carPlateNumbers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.plate}> {item}</Text>
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
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
  },
  plate: {
    fontSize: 16,
  },
});
