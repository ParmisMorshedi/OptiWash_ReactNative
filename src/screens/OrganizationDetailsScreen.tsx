import React from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type Params = {
  id: number;
  name: string;
  carPlateNumbers: string[];
};

const OrganizationDetailsScreen = () => {
  const route = useRoute<RouteProp<Record<string, Params>, string>>();
  const { name, carPlateNumbers } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🚧 {name}</Text>
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
              <Switch value={false} onValueChange={() => {}} />
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
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
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
