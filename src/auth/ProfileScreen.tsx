import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/Auth/ProfileScreen.styles';

const ProfileScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        setLoading(true);
        const name = await AsyncStorage.getItem('fullName');
        const storedEmail = await AsyncStorage.getItem('email');
        const admin = await AsyncStorage.getItem('isAdmin');
        setFullName(name || '');
        setEmail(storedEmail || '');
        setIsAdmin(admin === 'true');
        setLoading(false);
      };
      loadData();
    }, [])
  );

  const handleLogout = async () => {
    Alert.alert('Logga ut', 'Är du säker på att du vill logga ut?', [
      { text: 'Avbryt' },
      {
        text: 'Ja',
        onPress: async () => {
          await AsyncStorage.multiRemove(['authToken', 'fullName', 'email', 'isAdmin']);
          navigation.replace('Login');
        }
      }
    ]);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0097e6" />
        <Text style={{ marginTop: 10 }}>Laddar profil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?u=profile' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{fullName}</Text>
      {email ? <Text style={styles.email}>{email}</Text> : null}
      <Text style={styles.role}>{isAdmin ? 'Admin' : 'Användare'}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logga ut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
