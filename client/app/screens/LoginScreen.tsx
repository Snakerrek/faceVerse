import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Pressable } from 'react-native'; // Added Pressable
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, USER_DATA_KEY } from '../config';
import { LoginScreenProps } from '../types/navigation';
import { UserData } from '../types/userData';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (name: keyof typeof formData, value: string) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const storeUserData = async (userData: UserData) => {
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem(USER_DATA_KEY, jsonValue);
      console.log('User data stored successfully after login!');
    } catch (e) {
      console.error('Failed to store user data after login.', e);
    }
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setMessage('Email and password are required.');
      setIsError(true);
      return;
    }
    setIsLoading(true);
    setMessage(null);
    setIsError(false);

    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        const userData: UserData = result.user;
        await storeUserData(userData);
        console.log('Login successful, navigating to Home.');
        // Navigate to Home screen and reset stack, pass user data
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home', params: { user: userData } }],
        });
      } else {
        setMessage(result.error || `Login failed (Status: ${response.status})`);
        setIsError(true);
      }
    } catch (error) {
      console.error('Login Error:', error);
      setMessage('An error occurred during login. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"< Back"}</Text>
      </Pressable>

      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {message && (
        <Text style={isError ? styles.errorMessage : styles.successMessage}>
          {message}
        </Text>
      )}
      <Button
        title={isLoading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  successMessage: {
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default LoginScreen;
