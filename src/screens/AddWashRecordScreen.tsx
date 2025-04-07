

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Pressable } from 'react-native';
import { WashStatus } from '../models/WashRecord';
import API_URL from '../../config';
import { Car } from '../models/Car';


type Props = {
  carId?: number; // nullable
};

const AddWashRecordScreen = ({ carId }: Props) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(carId ?? null);
  const [washDate, setWashDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [interior, setInterior] = useState(false);
  const [exterior, setExterior] = useState(false);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<WashStatus>(WashStatus.Pending);


      
const onChangeDate = (event: any, selectedDate?: Date) => {
  setShowDatePicker(Platform.OS === 'ios'); 
  if (selectedDate) setWashDate(selectedDate);
};


  // 🔄 Load cars on mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_URL}/Cars`);
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Fel vid hämtning av bilar:', error);
        Alert.alert('Fel', 'Kunde inte hämta bilar.');
      }
    };
    fetchCars();
  }, []);
  const selectedCarPlate = cars.find(car => car.id === selectedCarId)?.plateNumber;

  const handleSubmit = async () => {
    if (!selectedCarId) {
      Alert.alert('Fel', 'Välj en bil.');
      return;
    }

    const washRecord = {
      carId: selectedCarId,
      washDate: washDate.toISOString(),
      interiorCleaned: interior,
      exteriorCleaned: exterior,
      notes: notes,
      status: status,

      userId: '8fdbab80-bb3a-4388-b340-0f7f05058421', // tillfälligt
    };

    try {
      const response = await fetch(`${API_URL}/WashRecords`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(washRecord),
      });

      if (response.ok) {
        Alert.alert('Succé', 'Tvätten sparades!');
        setSelectedCarId(null);
        setInterior(false);
        setExterior(false);
        setNotes('');
      } else {
        Alert.alert('Fel', 'Kunde inte spara tvätten.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Fel', 'Något gick fel.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lägg till tvätt</Text>

      <Text style={styles.label}>Välj bil</Text>
      {carId ? (
    <View style={styles.input}>
      <Text>{selectedCarPlate ?? 'Laddar...'}</Text>
    </View>
  ) : (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCarId}
          onValueChange={(itemValue) => setSelectedCarId(itemValue)}
        >
          <Picker.Item label="-- Välj en bil --" value={null} />
          {cars.map((car) => (
            <Picker.Item key={car.id} label={car.plateNumber} value={car.id} />
          ))}
        </Picker>
      </View>
  )}
      <View style={styles.switchRow}>
        <Text style={styles.label}>Invändig tvätt</Text>
        <Switch value={interior} onValueChange={setInterior} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Utvändig tvätt</Text>
        <Switch value={exterior} onValueChange={setExterior} />
      </View>

      <Text style={styles.label}>Anteckningar</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={3}
        value={notes}
        onChangeText={setNotes}
      />
      <Text style={styles.label}>Status</Text>
<View style={styles.pickerContainer}>
  <Picker
    selectedValue={status}
    onValueChange={(itemValue) => setStatus(itemValue)}
  >
    <Picker.Item label="⏳ Väntar" value={WashStatus.Pending} />
    <Picker.Item label="✔️ Klar" value={WashStatus.Completed} />
    <Picker.Item label="❌ Misslyckades" value={WashStatus.Failed} />
  </Picker>
</View>

      <Text style={styles.label}>Datum för tvätt</Text>
      <Pressable onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{washDate.toLocaleDateString()}</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={washDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Button title="Spara tvätt" onPress={handleSubmit} />
    </View>
  );
};

export default AddWashRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    marginTop: 15,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 5,
  },

  
});
