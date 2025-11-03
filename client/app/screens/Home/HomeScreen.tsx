import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity
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
import PostFeed from './PostFeed';
import { colors } from '../../theme';
import MenuModal from './MenuModal';
import { useRouter } from 'expo-router';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyAuthAndLoadData = async () => {
      setIsLoading(true);
      try {
        const token = await getAuthToken();
        if (!token) {
          console.log(
            'No auth token in SecureStore on Home, navigating to Welcome.'
          );
          router.replace('/');
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
        router.replace('/');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuthAndLoadData();
  }, [navigation]);

  const handleLogout = async () => {
    setIsMenuVisible(false);
    try {
      await deleteAuthToken();
      await removeUserData();
      console.log('Auth token and user data removed, navigating to Welcome.');
      router.replace('/');
    } catch (e) {
      console.error('Failed to logout.', e);
    }
  };

const handleNavigate = (screen: '/profile' | '/settings') => {
    router.push(screen);
    setIsMenuVisible(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>User data not present, or session expired...</Text>
        <Button
          title="Przejdź do logowania"
          onPress={() => router.navigate('/')}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <MenuModal
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <View style={styles.header}>
        <Text style={styles.logoText}>faceVerse</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={22} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsMenuVisible(true)} 
          >
            <Ionicons name="menu" size={26} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabButton, styles.tabButtonActive]}>
          <Ionicons name="home" size={26} style={styles.iconActive} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <FontAwesome5
            name="user-friends"
            size={24}
            style={styles.iconSecondary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <MaterialCommunityIcons
            name="television-play"
            size={28}
            style={styles.iconSecondary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <FontAwesome5
            name="user-circle"
            size={24}
            style={styles.iconSecondary}
          />
        </TouchableOpacity>
      </View>
      
      <PostFeed user={user} />
    </SafeAreaView>
  );
};

export default HomeScreen;