import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { register } from './authService';
import styles from '../styles/Auth/RegisterScreen.styles';

const RegisterScreen = ({ navigation }: any) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    fullName: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    const result = await register(form);
    setLoading(false);

    if (result.success) {
      Alert.alert('Registrering lyckades', 'Logga in nu');
      navigation.navigate('Login');
    } else {
      const message = Array.isArray(result.message)
        ? result.message.join('\n')
        : result.message;

      Alert.alert('Fel vid registrering', message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
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
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Användarnamn"
          style={styles.input}
          onChangeText={(v) => setForm({ ...form, username: v })}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Lösenord"
          style={styles.input}
          secureTextEntry
          onChangeText={(v) => setForm({ ...form, password: v })}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#273c75" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrera</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Har du redan ett konto? Logga in</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
