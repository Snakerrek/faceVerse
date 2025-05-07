// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { HomeScreenProps } from '../types/navigation';
import { UserData } from '../types/types';
import { deleteAuthToken, getAuthToken } from '../utils/authUtils';
import { getUserData, removeUserData } from '../utils/storageUtils';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuthAndLoadData = async () => {
      setIsLoading(true);
      try {
        const token = await getAuthToken();
        if (!token) {
          console.log('No auth token in SecureStore on Home, navigating to Welcome.');
          navigation.replace('Welcome');
          return;
        }

        // Load user display data from AsyncStorage
        const storedUserData = await getUserData()
        if(storedUserData) {
          setUser(storedUserData);
        }
      } catch (e) {
        console.error('Failed during auth verification or data load on Home.', e);
        navigation.replace('Welcome');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuthAndLoadData();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      // Remove auth token from SecureStore
      await deleteAuthToken()
      // Also remove user display data from AsyncStorage
      await removeUserData()
      console.log('Auth token and user data removed, navigating to Welcome.');
      navigation.replace('Welcome');
    } catch (e) {
      console.error('Failed to logout.', e);
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
    // This can happen if token was present but user data wasn't in AsyncStorage
    // Or if loading failed and didn't redirect.
    return (
      <View style={styles.container}>
        <Text>Loading user data or session expired...</Text>
        <Button title="Go to Login" onPress={() => navigation.replace('Welcome')} />
      </View>
    );
  }

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
