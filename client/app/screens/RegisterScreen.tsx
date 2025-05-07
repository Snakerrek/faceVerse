import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { RegisterScreenProps } from '../types/navigation';
import { RegisterData, Res, ResponseStatus } from '../types/types';
import { register } from '../backendService';

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (name: keyof typeof formData, value: string) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
      setMessage('All fields are required.');
      setIsError(true);
      return;
    }
    setIsLoading(true);
    setMessage(null);
    setIsError(false);
    const registerRes: Res = await register(formData);
    if(registerRes.status === ResponseStatus.OK){
      setMessage('Registration successful! Please login.');
      setIsError(false);
      setFormData({ email: '', password: '', first_name: '', last_name: '' });
      // Navigate to Login screen after successful registration
      console.log('Registration successful, navigating to Login.');
      navigation.navigate('Login');
    } else {
      console.error('Registration Error:', registerRes.message);
      setMessage(registerRes.message || 'An error occurred. Please try again.');
      setIsError(true);
    }
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"< Back"}</Text>
      </Pressable>

      <Text style={styles.title}>Register</Text>
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
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.first_name}
        onChangeText={(text) => handleChange('first_name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.last_name}
        onChangeText={(text) => handleChange('last_name', text)}
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {message && (
        <Text style={isError ? styles.errorMessage : styles.successMessage}>
          {message}
        </Text>
      )}
      <Button
        title={isLoading ? 'Registering...' : 'Register'}
        onPress={handleRegister}
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

export default RegisterScreen;
