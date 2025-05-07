import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { LoginScreenProps } from '../types/navigation';
import { ResponseStatus, Res, LoginData } from '../types/types';
import { login } from '../backendService';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const [isError, setIsError] = useState(false);

  const handleChange = (name: keyof typeof formData, value: string) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setMessage('Email and password are required.');
      setIsError(true);
      return;
    }
    setIsLoading(true);
    setMessage(undefined);
    setIsError(false);
    const loginRes: Res = await login(formData);
    if(loginRes.status === ResponseStatus.OK) {
    //Navigate to Home screen and reset stack, pass user data
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
    } else {
      setMessage(loginRes.message);
      setIsError(true)
    }
    setIsLoading(false);
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
