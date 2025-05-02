import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { login } from './authService';
import styles from '../styles/Auth/LoginScreen.styles';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      // Token hanteras av RootNavigator
    } else {
      Alert.alert('Inloggning misslyckades', result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logga in</Text>

      <TextInput
        placeholder="Användarnamn"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Lösenord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#44bd32" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Logga in</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Har du inget konto? Registrera dig</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
