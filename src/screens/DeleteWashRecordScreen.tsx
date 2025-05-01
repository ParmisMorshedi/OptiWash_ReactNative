import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import API_URL from '../../config';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type WashRecord = {
  id: number;
  washDate: string;
  notes?: string;
  interiorCleaned: boolean;
  exteriorCleaned: boolean;
  status: number;
  carId: number;
};

type RouteParams = {
  DeleteWashRecord: {
    carId: number;
    plateNumber: string;
    month: string;
  };
};

const DeleteWashRecordScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'DeleteWashRecord'>>();
  const { carId, plateNumber, month } = route.params;

  const navigation = useNavigation<any>();
  const [records, setRecords] = useState<WashRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/WashRecords/all`);
      const all = await res.json();

      const filtered = all.filter((r: WashRecord) => {
        const washDate = new Date(r.washDate);
        const monthStr = `${washDate.getFullYear()}-${String(
          washDate.getMonth() + 1
        ).padStart(2, '0')}`;
        return r.carId === carId && monthStr === month;
      });

      setRecords(filtered);
    } catch (error) {
      console.error(error);
      Alert.alert('Fel', 'Kunde inte hämta tvättar.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recordId: number) => {
    Alert.alert('Är du säker?', 'Vill du ta bort denna tvätt?', [
      {
        text: 'Avbryt',
        style: 'cancel',
      },
      {
        text: 'Ja, ta bort',
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await fetch(`${API_URL}/WashRecords/${recordId}`, {
              method: 'DELETE',
            });
            if (res.ok) {
              fetchRecords();
            } else {
              Alert.alert('Fel', 'Kunde inte ta bort.');
            }
          } catch (error) {
            Alert.alert('Fel', 'Något gick fel.');
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧽 Tvättar för {plateNumber}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={() => (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.deleteText}>🗑 Ta bort</Text>
                </TouchableOpacity>
              )}
            >
              <View style={styles.card}>
                <Text>📅 {new Date(item.washDate).toLocaleDateString()}</Text>
                <Text>
                  ✅ Inre: {item.interiorCleaned ? 'Ja' : 'Nej'} | Yttre:{' '}
                  {item.exteriorCleaned ? 'Ja' : 'Nej'}
                </Text>
                {item.notes && <Text>📝 {item.notes}</Text>}
              </View>
            </Swipeable>
          )}
        />
      )}
    </View>
  );
};

export default DeleteWashRecordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 6,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 6,
    borderRadius: 8,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
