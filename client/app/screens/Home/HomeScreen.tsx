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
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import PostFeed from './PostFeed';
import { colors } from '../../theme';
import MenuModal from './MenuModal';
import { useRouter } from 'expo-router';
import SearchScreen from '../Search/SearchScreen';

type ActiveTab = 'home' | 'search';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
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
          title="Go to login page"
          onPress={() => router.replace('/')} 
        />
      </View>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <PostFeed user={user} />;
      case 'search':
        return <SearchScreen />;
      default:
        return <PostFeed user={user} />;
    }
  };

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
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'home' && styles.tabButtonActive]}
          onPress={() => setActiveTab('home')}
        >
          <Ionicons 
            name="home" 
            size={26} 
            style={activeTab === 'home' ? styles.iconActive : styles.iconSecondary} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'search' && styles.tabButtonActive]}
          onPress={() => setActiveTab('search')}
        >
          <FontAwesome5
            name="user-friends"
            size={24}
            style={activeTab === 'search' ? styles.iconActive : styles.iconSecondary}
          />
        </TouchableOpacity>
      </View>
      {renderActiveTab()}
    </SafeAreaView>
  );
};

export default HomeScreen;