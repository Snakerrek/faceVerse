import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { WelcomeScreenProps } from '../../types/navigation';
import { getAuthToken } from '../../utils/authUtils';
import styles from './WelcomeScreen.styles';
import { useRouter } from 'expo-router';

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
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
        <Button title="Login" onPress={() => router.push('/login')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={() => router.push('/register')} />
      </View>
    </View>
  );
};

export default WelcomeScreen;
