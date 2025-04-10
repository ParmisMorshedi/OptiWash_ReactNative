import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import API_URL from '../../config';
import { Car } from '../models/Car';
import { Organization } from '../models/Organization';


interface Props {
  visible: boolean;
  onClose: () => void;
  organization: Organization;
}

const AddCarToOrganizationModal = ({ visible, onClose, organization }: Props) => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      const res = await fetch(`${API_URL}/Cars`);
      const data = await res.json();
      setCars(data);
    };
    fetchCars();
  }, []);

  const handleAddCar = async (carId: number) => {
    try {
      const res = await fetch(`${API_URL}/Organizations/${organization.id}/AddCar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carId }),
      });

      if (res.ok) {
        Alert.alert('Bil tillagd!');
        onClose();
      } else {
        Alert.alert('Fel vid tillägg.');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Något gick fel.');
    }
  };
  const availableCars = cars.filter(
    (car) => !organization.carPlateNumbers.includes(car.plateNumber)
  );
  
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        
        <Text style={styles.header}>Välj en bil till {organization.name}</Text>
        <FlatList
          data={availableCars}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleAddCar(item.id)} style={styles.card}>
              <Text>{item.plateNumber}</Text>
            </TouchableOpacity>
          )}
        />
        <Button title="Stäng" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default AddCarToOrganizationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
  },
});
