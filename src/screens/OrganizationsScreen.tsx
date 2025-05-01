import React, { useEffect, useState, useCallback, useRef } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { OrganizationStackParamList } from '../navigation/OrganizationStack'; 
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import API_URL from '../../config';
import { Organization } from '../models/Organization';
import AddCarToOrganizationModal from './AddCarToOrganizationModal';
import Swipeable from 'react-native-gesture-handler/Swipeable';


const OrganizationsScreen = () => {
  const openedRow = useRef<any>(null);
  const swipeableRefs = useRef<{ [key: number]: any }>({});
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [showAddCarModal, setShowAddCarModal] = useState(false);

  const handleModalClose = () => {
    setShowAddCarModal(false);
    fetchOrganizations(); 
  };
  const navigation = useNavigation<NativeStackNavigationProp<OrganizationStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      if (openedRow.current) {
        openedRow.current.close();
      }
      fetchOrganizations();
    }, [])
  );
  

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleDeleteOrganization = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/Organizations/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        Alert.alert('🗑 Raderad!', 'Organisationen togs bort.');
        fetchOrganizations(); 
      } else {
        Alert.alert('Fel', 'Kunde inte ta bort organisationen.');
      }
    } catch (err) {
      console.error('❌ Delete error:', err);
      Alert.alert('Fel', 'Något gick fel vid borttagning.');
    }
  };
  
  const renderRightActions = (item: Organization) => (
    <View style={styles.actionButtons}>
         <TouchableOpacity
      style={styles.editButton}
      onPress={() => navigation.navigate('EditOrganization', { orgId: item.id })}
    >
      <Text style={styles.actionText}>✏️ Redigera</Text>
    </TouchableOpacity>
      <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDeleteOrganization(item.id)}
       >
      <Text style={styles.actionText}>🗑 Ta bort</Text>
      </TouchableOpacity>
    </View>
  );
  
  const fetchOrganizations = async () => {
    try {
      const response = await fetch(`${API_URL}/Organizations`);
      const data = await response.json();
      setOrganizations(data);
    } catch (error) {
      console.error('Fel vid hämtning av organisationer:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Organization }) => (
    <Swipeable
    renderRightActions={() => renderRightActions(item)}
    onSwipeableOpen={() => {
      if (openedRow.current && openedRow.current !== swipeableRefs.current[item.id]) {
        openedRow.current.close();
      }
      openedRow.current = swipeableRefs.current[item.id];
    }}
    ref={(ref) => {
      swipeableRefs.current[item.id] = ref;
    }}
  >
     <TouchableOpacity
      onPress={() =>
        navigation.navigate('OrganizationDetails', {
          id: item.id,
          name: item.name,
          city: item.location,
          carPlateNumbers: item.carPlateNumbers,
        } as any)
      }
      onLongPress={() => {
        setSelectedOrg(item);
        setShowAddCarModal(true);
      }}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>📍 {item.location}</Text>
        <Text>🚗 Antal bilar: {item.carPlateNumbers.length}</Text>
      </View>
    </TouchableOpacity>
  </Swipeable>
);
  

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={organizations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      {showAddCarModal && selectedOrg && (
  <AddCarToOrganizationModal
    visible={showAddCarModal}
    onClose={handleModalClose}
    organization={selectedOrg}
  />
)}
<TouchableOpacity
  style={styles.addButton}
  onPress={() => navigation.navigate('AddOrganization')}
>
  <Text style={styles.addButtonText}>+ Lägg till ny organisation</Text>
</TouchableOpacity>
    </View>
  );
};

export default OrganizationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    marginBottom: 12,
  },
  
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  
  actionButtons: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-end',
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
