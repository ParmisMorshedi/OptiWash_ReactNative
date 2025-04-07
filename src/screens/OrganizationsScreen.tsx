import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { OrganizationStackParamList } from '../navigation/OrganizationStack'; 
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import API_URL from '../../config';
import { Organization } from '../models/Organization';
import AddCarToOrganizationModal from './AddCarToOrganizationModal';


const OrganizationsScreen = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [showAddCarModal, setShowAddCarModal] = useState(false);

  const handleModalClose = () => {
    setShowAddCarModal(false);
    fetchOrganizations(); 
  };
  const navigation = useNavigation<NativeStackNavigationProp<OrganizationStackParamList>>();



  useEffect(() => {
    fetchOrganizations();
  }, []);

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
    <TouchableOpacity
    onPress={() =>
      navigation.navigate('OrganizationDetails', {
        id: item.id,
        name: item.name,
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
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Organisationer</Text>
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
});
