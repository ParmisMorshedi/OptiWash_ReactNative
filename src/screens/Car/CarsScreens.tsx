import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import API_URL from '../../../config';
import { Car } from '../../models/Car';
import DeleteCarModal from './DeleteCarModal';
import styles from '../../styles/Car/CarScreen.styles';

const CarsScreen = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedPlate, setSelectedPlate] = useState('');
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<any>();

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/Cars`);
      if (!response.ok) throw new Error();
      const data: Car[] = await response.json();
      setCars(data);
    } catch {
      Alert.alert('Fel', 'Misslyckades att hämta bilar.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCars();
    }, [])
  );

  const openDeleteModal = (id: number, plate: string) => {
    setSelectedCarId(id);
    setSelectedPlate(plate);
    setShowDeleteModal(true);
  };

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
    } catch {
      Alert.alert('Fel', 'Kunde inte hämta tvättinformation.');
    }
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

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 100 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bil listor</Text>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item)}>
            <TouchableOpacity
              onPress={() => handleCarPress(item.id)}
              style={styles.card}
            >
              <Text style={styles.text}>🚗 {item.plateNumber}</Text>
              <Text style={[styles.text, !item.scannedLicensePlate && { color: '#aaa' }]}>
                📸 {item.scannedLicensePlate || 'Ej skannad'}
              </Text>
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCar')}
      >
        <Text style={styles.addButtonText}>+ Lägg till ny bil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarsScreen;
