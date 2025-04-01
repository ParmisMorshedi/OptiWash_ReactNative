import React, { useEffect, useState, useCallback } from 'react';
import { 
  View,
   Text,
    FlatList, 
    StyleSheet, 
    TouchableOpacity,
    ActivityIndicator 
  } from 'react-native';
import { WashRecord, WashStatus  } from '../models/WashRecord';
import API_URL from '../../config';
import { useFocusEffect , useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';


const WashRecordsScreen = () => {
  const [records, setRecords] = useState<WashRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();



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
 // Hämtar bilar vid fokusering på skärmen
  useFocusEffect(
    useCallback(() => {
      fetchWashRecords();
    }, [])
  );
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
       <TouchableOpacity
            style={styles.addButton}      
            onPress={() => navigation.navigate('AddWashRecord')}      >
            <Text style={styles.navigateButtonText}>Lägg till ny tvätt</Text>
      </TouchableOpacity>
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
  navigateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
});
