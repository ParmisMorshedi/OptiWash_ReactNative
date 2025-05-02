import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { register } from './authService';

const RegisterScreen = ({ navigation }: any) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    fullName: '',
    password: ''
  });

  const handleRegister = async () => {
    const result = await register(form);
    if (result.success) {
      Alert.alert('Registrering lyckades', 'Logga in nu');
      navigation.navigate('Login');
    } else {
      const message = Array.isArray(result.message)
      ? result.message.join('\n')
      : result.message;
    
    Alert.alert('Fel vid registrering', message);    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skapa konto</Text>

      <TextInput
        placeholder="Fullständigt namn"
        style={styles.input}
        onChangeText={(v) => setForm({ ...form, fullName: v })}
      />
      <TextInput
        placeholder="E-post"
        style={styles.input}
        onChangeText={(v) => setForm({ ...form, email: v })}
      />
      <TextInput
        placeholder="Användarnamn"
        style={styles.input}
        onChangeText={(v) => setForm({ ...form, username: v })}
      />
      <TextInput
        placeholder="Lösenord"
        style={styles.input}
        secureTextEntry
        onChangeText={(v) => setForm({ ...form, password: v })}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrera</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Har du redan ett konto? Logga in</Text>
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
    backgroundColor: '#273c75',
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

export default RegisterScreen;
