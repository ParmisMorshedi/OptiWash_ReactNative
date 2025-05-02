import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import API_URL from '../../../config';
import styles from '../../styles/WashRecord/WashScreen.styles';


type WashCar = {
  id: number; 
  plateNumber: string;
  interior: boolean;
  exterior: boolean;
  status: string;
  note?: string;
};

type WashCompany = {
  id: number;
  name: string;
  city: string;
  cars: WashCar[];
};

const WashScheduleScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [completed, setCompleted] = useState<WashCompany[]>([]);
  const [notCompleted, setNotCompleted] = useState<WashCompany[]>([]);
  const monthsList = generateMonths(12);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [selectedMonth])
  );

  const fetchData = async () => {
    try {
      setCompleted([]);
      setNotCompleted([]);
      const res = await fetch(`${API_URL}/WashRecords/monthly?month=${selectedMonth}`);
      const data = await res.json();
      console.log('📅 Month fetched:', selectedMonth, data);
      setCompleted(data.completed);
      setNotCompleted(data.notCompleted);
    } catch (err) {
      console.log('Failed to load wash records:', err);
    }
  };

  const renderCarDetails = (car: WashCar, index: number) => (
    <View style={styles.carDetails} key={`${car.plateNumber}_${index}`}>
      <Text style={styles.carPlate}>🚗 {car.plateNumber}</Text>
      <Text>
        🧼 Typ: {car.interior ? 'Invändig' : ''}{car.interior && car.exterior ? ' & ' : ''}{car.exterior ? 'Utvändig' : ''}
      </Text>
      {car.note && <Text>📝 {car.note}</Text>}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DeleteWashRecord', {
            carId: car.id,
            plateNumber: car.plateNumber,
            month: selectedMonth,
          })
        }
      >
        <Text style={styles.carPlate}>🗑 Ta bort</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCompany = (item: WashCompany) => (
    <View style={styles.card}>
      <Text style={styles.companyName}>🏢 {item.name}</Text>
      <Text>📍 {item.city}</Text>
      <Text>🚗 {item.cars.length} bilar</Text>
      {item.cars.map((car, index) => (
        <View key={`${car.plateNumber}-${index}`}>
          {renderCarDetails(car, index)}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedMonth}
        onValueChange={(val) => {
          setSelectedMonth(val);
          fetchData();
        }}
        style={styles.picker}
      >
        {monthsList.map((m) => (
          <Picker.Item key={m.value} label={m.label} value={m.value} />
        ))}
      </Picker>

      <Text style={styles.subHeader}>✅ Klar</Text>
      <FlatList
        data={completed}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderCompany(item)}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <Text style={styles.subHeader}>❌ Ej Klar</Text>
      <FlatList
        data={notCompleted}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderCompany(item)}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddWashRecord')}
      >
        <Text style={styles.addButtonText}>+ Lägg till ny tvätt</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WashScheduleScreen;

const getCurrentMonth = () => {
  const now = new Date();
  return now.toISOString().slice(0, 7); // YYYY-MM
};

const generateMonths = (count = 12) => {
  const months: { label: string; value: string }[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = capitalize(date.toLocaleString('sv-SE', { year: 'numeric', month: 'long' }));
    const value = date.toISOString().slice(0, 7);
    months.push({ label, value });
  }

  return months;
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

