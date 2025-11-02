import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { HomeScreenProps } from '../../types/navigation';
import { UserData } from '../../types/types';
import { deleteAuthToken, getAuthToken } from '../../utils/authUtils';
import { getUserData, removeUserData } from '../../utils/storageUtils';
import styles from './HomeScreen.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import PostFeed from './PostFeed'; // <-- Import the new component

// --- mockPost and PostCard component are now REMOVED ---

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Auth logic (unchanged) ---
  useEffect(() => {
    const verifyAuthAndLoadData = async () => {
      setIsLoading(true);
      try {
        const token = await getAuthToken();
        if (!token) {
          console.log(
            'No auth token in SecureStore on Home, navigating to Welcome.'
          );
          navigation.replace('Welcome');
          return;
        }

        const storedUserData = await getUserData();
        if (storedUserData) {
          setUser(storedUserData);
        } else {
          console.warn(
            'Token found but no user data in AsyncStorage. Logging out.'
          );
          handleLogout();
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

  // --- Logout logic (unchanged) ---
  const handleLogout = async () => {
    try {
      await deleteAuthToken();
      await removeUserData();
      console.log('Auth token and user data removed, navigating to Welcome.');
      navigation.replace('Welcome');
    } catch (e) {
      console.error('Failed to logout.', e);
    }
  };

  // --- Loading screen (unchanged) ---
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // --- Auth guard (unchanged) ---
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Brak danych użytkownika lub sesja wygasła...</Text>
        <Button
          title="Przejdź do logowania"
          onPress={() => navigation.replace('Welcome')}
        />
      </View>
    );
  }

  // --- Facebook-style UI (Updated) ---
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. Header (unchanged) */}
      <View style={styles.header}>
        <Text style={styles.logoText}>faceVerse</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <Ionicons name="menu" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Tab Bar (unchanged) */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabButton, styles.tabButtonActive]}>
          <Ionicons name="home" size={26} color="#1877f2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <FontAwesome5 name="user-friends" size={24} color="#606770" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <MaterialCommunityIcons
            name="television-play"
            size={28}
            color="#606770"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <FontAwesome5 name="user-circle" size={24} color="#606770" />
        </TouchableOpacity>
      </View>

      {/* 3. Feed (REPLACED) */}
      {/* The ScrollView, createPostContainer, and mock PostCard
        have been replaced with the new PostFeed component.
        We pass the user data to it.
      */}
      <PostFeed user={user} />
    </SafeAreaView>
  );
};

export default HomeScreen;