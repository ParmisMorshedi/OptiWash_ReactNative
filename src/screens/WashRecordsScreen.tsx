import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { WashRecord, WashStatus  } from '../models/WashRecord';
import API_URL from '../../config';

const WashRecordsScreen = () => {
  const [records, setRecords] = useState<WashRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWashRecords();
  }, []);

  const fetchWashRecords = async () => {
    try {
      const response = await fetch(`${API_URL}/WashRecords/all`);
      const data = await response.json();
      console.log('Fetched wash records:', data);
      setRecords(data);
    } catch (error) {
      console.error('Failed to fetch wash records:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: WashRecord }) => (
      <View style={styles.card}>
      <Text style={styles.text}>🧼 Car : {item.carPlateNumber || 'Okänd'}</Text>
      <Text style={styles.text}>📅 Date: {new Date(item.washDate).toLocaleDateString()}</Text>
      <Text style={styles.text}>🧽 Interior: {item.interiorCleaned ? 'Yes' : 'No'}</Text>
      <Text style={styles.text}>🚿 Exterior: {item.exteriorCleaned ? 'Yes' : 'No'}</Text>
      {item.notes ? <Text style={styles.text}>📝 Notes: {item.notes}</Text> : null}
      <Text style={styles.text}>
  📌 Status: {item.status === 0 ? '⏳ Väntar' : item.status === 1 ? '✔️ Klar' : '❌ Misslyckades'}
</Text>

    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wash Records</Text>
      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default WashRecordsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});
