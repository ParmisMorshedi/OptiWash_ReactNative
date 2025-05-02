import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { login } from './authService';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const result = await login(username, password);
    if (result.success) {
    } else {
      Alert.alert('Login misslyckades', result.message);
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
      />
      <TextInput
        placeholder="Lösenord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Logga in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Har du inget konto? Registrera dig</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2f3640'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dcdde1'
  },
  button: {
    backgroundColor: '#44bd32',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#487eb0'
  }
});

export default LoginScreen;
