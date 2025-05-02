import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../config';
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    const { token, fullName, isAdmin } = response.data;

    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('fullName', fullName);
    await AsyncStorage.setItem('isAdmin', isAdmin.toString());

    return { success: true };
  } catch {
    return { success: false, message: 'Invalid credentials' };
  }
};

export const register = async (form: {
  username: string;
  email: string;
  password: string;
  fullName: string;
}) => {
  try {
    await axios.post(`${API_URL}/auth/register`, form);
    return { success: true };
  } catch (err: any) {
    let message: string = 'Registration failed';

    if (err.response?.data) {
      const data = err.response.data;

      if (typeof data === 'object') {
        const values = Object.values(data).flat().map((v) => {
          if (typeof v === 'string') return v;
          if (typeof v === 'object') return JSON.stringify(v);
          return String(v);
        });
        message = values.join('\n');
      } else if (typeof data === 'string') {
        message = data;
      }
    }

    return { success: false, message };
  }
};