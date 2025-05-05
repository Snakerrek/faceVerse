// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { API_BASE_URL } from './config';

// Define an interface for the form data structure [4]
interface SignUpFormData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

const RegisterScreen: React.FC = () => {
  // State for form inputs [4]
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // State for feedback messages
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // Handle changes in input fields [4]
  const handleChange = (name: keyof SignUpFormData, value: string) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleRegister = async () => {
    // Basic validation (can be expanded with libraries like Yup [5])
    if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
      setMessage('All fields are required.');
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setMessage(null);
    setIsError(false);

    try {
      // Make POST request to the backend [3][4]
      const response = await fetch(`${API_BASE_URL}/users/`, { // Endpoint path
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      const result = await response.json(); // Parse JSON response

      if (response.ok) { // Check if request was successful (status 2xx)
        setMessage(result.message || 'Registration successful!');
        setIsError(false);
        // Optionally clear form or navigate away
        setFormData({ email: '', password: '', first_name: '', last_name: '' });
      } else {
        // Handle errors from backend (e.g., email exists, validation error)
        setMessage(result.error || `Registration failed (Status: ${response.status})`);
        setIsError(true);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Registration Error:', error);
      setMessage('An error occurred. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return (
    <View style={styles.container}>
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
        secureTextEntry // Hide password input
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

      {/* Display Loading Indicator */}
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* Display Success/Error Messages */}
      {message && (
        <Text style={isError ? styles.errorMessage : styles.successMessage}>
          {message}
        </Text>
      )}

      <Button
        title={isLoading ? 'Registering...' : 'Register'}
        onPress={handleRegister}
        disabled={isLoading} // Disable button while loading
      />
    </View>
  );
};

// Basic Styling (mimicking simple form layout)
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
    borderRadius: 5, // Slightly rounded corners
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
});

export default RegisterScreen;
