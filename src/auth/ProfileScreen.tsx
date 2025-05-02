import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const name = await AsyncStorage.getItem('fullName');
      const storedEmail = await AsyncStorage.getItem('email');
      const admin = await AsyncStorage.getItem('isAdmin');
      setFullName(name || '');
      setEmail(storedEmail || '');
      setIsAdmin(admin === 'true');
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    Alert.alert('Logga ut', 'Är du säker på att du vill logga ut?', [
      { text: 'Avbryt' },
      {
        text: 'Ja',
        onPress: async () => {
          await AsyncStorage.removeItem('authToken');
          navigation.replace('Login');
        }
      }
    ]);
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2f3640'
  },
  email: {
    fontSize: 16,
    color: '#718093',
    marginTop: 4
  },
  role: {
    fontSize: 14,
    color: '#0097e6',
    marginTop: 10
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#e84118',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  logoutText: {
    color: '#fff',
    fontSize: 16
  }
});

export default ProfileScreen;
