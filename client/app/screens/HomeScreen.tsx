import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeScreenProps } from '../types/navigation';
import { UserData } from '../types/userData';
import { USER_DATA_KEY } from '../config';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start in loading state

  useEffect(() => {
    const loadUserFromStorage = async () => {
      setIsLoading(true);
      try {
        const jsonValue = await AsyncStorage.getItem(USER_DATA_KEY);
        if (jsonValue != null) {
          const storedUser: UserData = JSON.parse(jsonValue);
          setUser(storedUser);
          console.log('User data loaded from AsyncStorage on Home screen:', storedUser);
        } else {
          // No user data found in storage, means user is not logged in or data was cleared
          console.log('No user data in AsyncStorage, navigating to Welcome from Home.');
          navigation.replace('Welcome'); // Redirect to Welcome/Login flow
        }
      } catch (e) {
        console.error('Failed to load user from storage on Home screen.', e);
        // Handle error, e.g., by redirecting to an error screen or login
        navigation.replace('Welcome');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(USER_DATA_KEY);
      console.log('User logged out, navigating to Welcome.');
      // Replace current screen with Welcome, so user can't go "back" to Home
      navigation.replace('Welcome');
    } catch (e) {
      console.error('Failed to logout.', e);
      // Handle error during logout if necessary
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!user) {
    // This case should ideally be handled by the redirect in useEffect,
    // but as a fallback or if loading fails without redirecting immediately:
    return (
      <View style={styles.container}>
        <Text>No user data found. Please log in.</Text>
        <Button title="Go to Login" onPress={() => navigation.replace('Welcome')} />
      </View>
    );
  }

  // If user data is loaded successfully
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome, {user.first_name}!
      </Text>
      <Text>Email: {user.email}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} />
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 30,
    width: '60%',
  },
});

export default HomeScreen;
