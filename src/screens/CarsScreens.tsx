import React, { useEffect, useState, useCallback } from 'react';
import { View, 
  Text,
   FlatList,
    ActivityIndicator,
     StyleSheet,
      TouchableOpacity,
       Alert 
      } from 'react-native';
import { useFocusEffect , useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import API_URL from '../../config';
import { Car } from '../models/Car';
import DeleteCarModal from './DeleteCarModal';

const CarsScreen = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedPlate, setSelectedPlate] = useState('');

  const navigation = useNavigation<any>();

  // Get Car
  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/Cars`);
      if (!response.ok) throw new Error('Failed to fetch cars');
      const data: Car[] = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      Alert.alert('Fel', 'Misslyckades att hämta bilar.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCars(); 
    });
  
    return unsubscribe; 
  }, [navigation]);

  // Tar bort bil
const openDeleteModal = (id: number, plate: string) => {
    setSelectedCarId(id);
    setSelectedPlate(plate);
    setShowDeleteModal(true);
  };

  const renderRightActions = (item: Car) => (
    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditCar', { carId: item.id })}
      >
        <Text style={styles.actionText}>✏️ Redigera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => openDeleteModal(item.id, item.plateNumber)}
      >
        <Text style={styles.actionText}>🗑 Ta bort</Text>
      </TouchableOpacity>
    </View>
  );
  const handleCarPress = async (carId: number) => {
    try {
      const res = await fetch(`${API_URL}/WashRecords/car/${carId}`);
      const records = await res.json();
  
      if (Array.isArray(records) && records.length > 0) {
        const latestRecord = records[records.length - 1];
  
        navigation.navigate('EditWashRecord', { washRecordId: latestRecord.id });
      } else {
        navigation.navigate('AddWashRecord', { carId });
      }
    } catch (err) {
      console.error('❌ Error checking wash records:', err);
      Alert.alert('Fel', 'Kunde inte hämta tvättinformation.');
    }
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 100 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bil listor</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCar')}
      >
        <Text style={styles.addButtonText}>+ Lägg till ny bil</Text>
      </TouchableOpacity>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item)}>
            <TouchableOpacity
            onPress={() => handleCarPress(item.id)}
            style={styles.card}
          >
              <Text style={styles.text}>🚗 Plate: {item.plateNumber}</Text>
              <Text style={styles.text}>📸 Scanned: {item.scannedLicensePlate || 'N/A'}</Text>
            </TouchableOpacity>
          </Swipeable>
        )}
      />

      {selectedCarId !== null && (
        <DeleteCarModal
          visible={showDeleteModal}
          carId={selectedCarId}
          plateNumber={selectedPlate}
          onClose={() => setShowDeleteModal(false)}
          onDeleted={fetchCars}
        />
      )}
    </View>
  );
};

export default CarsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 5,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});