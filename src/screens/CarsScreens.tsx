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

const CarsScreen = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
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

  // Hämtar bilar vid fokusering på skärmen
  useFocusEffect(
    useCallback(() => {
      fetchCars();
    }, [])
  );

  // Tar bort bil
  const deleteCar = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/Cars/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete car');
      setCars((prevCars) => prevCars.filter(car => car.id !== id));
      Alert.alert('Bilen är borttagen!');
    } catch (error) {
      console.error('Error deleting car:', error);
      Alert.alert('Fel', 'Misslyckades att ta bort bilen.');
    }
  };

  // Renderar åtgärdsknappar (redigera & ta bort)
  const renderRightActions = (id: number) => (
    <View style={styles.actionButtons}>
      <TouchableOpacity style={styles.editButton} onPress={() => Alert.alert('Redigera bilen', `ID: ${id}`)}>
        <Text style={styles.actionText}>✏️ Redigera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteCar(id)}>
        <Text style={styles.actionText}>🗑 Ta bort</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bil listor</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCar')}      >
        <Text style={styles.addButtonText}>+ Lägg till ny bil</Text>
      </TouchableOpacity>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <TouchableOpacity
        onPress={() => navigation.navigate('AddWashRecord', { carId: item.id })} 
        style={styles.card}
      >
        <Text style={styles.text}>🚗 Plate: {item.plateNumber}</Text>
        <Text style={styles.text}>📸 Scanned: {item.scannedLicensePlate || 'N/A'}</Text>
      </TouchableOpacity>

          </Swipeable>
        )}
      />
    </View>
  );
};

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
    // textAlign: 'center',
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
  navigateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  navigateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
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

export default CarsScreen;
