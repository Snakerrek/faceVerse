import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { WelcomeScreenProps } from '../types/navigation';
import { getAuthToken } from '../utils/authUtils';

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Check for token in SecureStore
        const token = await getAuthToken();
        if (token) {
          console.log('Auth token found in SecureStore, navigating to Home.');
          navigation.replace('Home');
        } else {
          console.log('No auth token in SecureStore, staying on Welcome.');
          setIsLoading(false);
        }
      } catch (e) {
        console.error('Failed to load auth token from SecureStore.', e);
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FaceVerse</Text>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
});

export default WelcomeScreen;
