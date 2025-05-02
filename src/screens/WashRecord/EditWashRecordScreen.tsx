// EditWashRecordScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  Alert,
  Pressable,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import API_URL from '../../../config';
import { WashStatus } from '../../models/WashRecord';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../styles/WashRecord/WashScreen.styles';

type RouteParams = {
  EditWashRecord: {
    washRecordId: number;
  };
};

const EditWashRecordScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'EditWashRecord'>>();
  const navigation = useNavigation<any>();
  const { washRecordId } = route.params;

  const [washDate, setWashDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [interior, setInterior] = useState(false);
  const [exterior, setExterior] = useState(false);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<WashStatus>(WashStatus.Pending);

  useEffect(() => {
    const fetchWashRecord = async () => {
      try {
        const response = await fetch(`${API_URL}/WashRecords/${washRecordId}`);
        const data = await response.json();
        console.log('Fetched WashRecord:', data);

        setInterior(data.interiorCleaned);
        setExterior(data.exteriorCleaned);
        setNotes(data.notes);
        setStatus(data.status);
        setWashDate(new Date(data.washDate));
      } catch (error) {
        console.error('❌ Fel vid hämtning:', error);
        Alert.alert('Fel', 'Kunde inte hämta tvättinfo');
      }
    };

    fetchWashRecord();
  }, [washRecordId]);

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/WashRecords/${washRecordId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          washDate: washDate.toISOString(),
          interiorCleaned: interior,
          exteriorCleaned: exterior,
          notes,
          status,
        }),
      });
  
      if (res.status === 204 || res.status === 200) {
        Alert.alert('✅ Succé', 'Tvätten uppdaterades!');
        navigation.goBack();
      } else {
        const text = await res.text();
        console.log('❌ Backend response:', res.status, text);
        Alert.alert('Fel', 'Kunde inte spara tvätten.');
      }
  
    } catch (e) {
      console.error('🚨 Error in handleSave:', e);
      Alert.alert('Fel', 'Något gick fel vid spara.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redigera Tvätt</Text>

      <View style={styles.switchRow}>
        <Text>Invändig tvätt</Text>
        <Switch value={interior} onValueChange={setInterior} />
      </View>

      <View style={styles.switchRow}>
        <Text>Utvändig tvätt</Text>
        <Switch value={exterior} onValueChange={setExterior} />
      </View>

      <Text>Anteckningar</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
      />

      <Text>Status</Text>
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

      <Text>Datum</Text>
      <Pressable onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{washDate.toLocaleDateString()}</Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={washDate}
          mode="date"
          display="default"
          onChange={(e, d) => {
            setShowDatePicker(false);
            if (d) setWashDate(d);
          }}
        />
      )}

      <Button title="Spara" onPress={handleSave} />
    </View>
  );
};

export default EditWashRecordScreen;


