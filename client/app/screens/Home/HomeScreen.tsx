import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { HomeScreenProps } from '../../types/navigation';
import { UserData } from '../../types/types';
import { deleteAuthToken, getAuthToken } from '../../utils/authUtils';
import { getUserData, removeUserData } from '../../utils/storageUtils';
import styles from './HomeScreen.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

// --- Przykładowy komponent Posta (do zastąpienia FlatList w przyszłości) ---
const mockPost = {
  id: '1',
  user: {
    name: 'Jan Kowalski',
    avatarUrl: null, // Placeholder
  },
  content: 'To jest mój pierwszy post w aplikacji FaceVerse! Wygląda świetnie.',
  timestamp: '2 godz. temu',
  likes: 12,
  comments: 3,
};

const PostCard: React.FC<{ post: typeof mockPost }> = ({ post }) => {
  return (
    <View style={styles.postCard}>
      {/* Nagłówek posta */}
      <View style={styles.postHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLetter}>{post.user.name[0]}</Text>
        </View>
        <View style={styles.postHeaderText}>
          <Text style={styles.postUserName}>{post.user.name}</Text>
          <Text style={styles.postTimestamp}>{post.timestamp}</Text>
        </View>
      </View>

      {/* Treść posta */}
      <Text style={styles.postContent}>{post.content}</Text>

      {/* Separator */}
      <View style={styles.postSeparator} />

      {/* Akcje posta */}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="thumbs-up-outline" size={20} color="#606770" />
          <Text style={styles.actionText}>Lubię to!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="comment-outline" size={20} color="#606770" />
          <Text style={styles.actionText}>Komentarz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="share-outline" size={20} color="#606770" />
          <Text style={styles.actionText}>Udostępnij</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// --- Koniec komponentu Posta ---

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ta logika pochodzi z Twojego kodu na GitHub
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
        const storedUserData = await getUserData();
        if (storedUserData) {
          setUser(storedUserData);
        } else {
          // Jeśli z jakiegoś powodu dane usera zniknęły, a token jest
          console.warn('Token found but no user data in AsyncStorage. Logging out.');
          handleLogout(); // Wymuś wylogowanie
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

  // Ta logika pochodzi z Twojego kodu na GitHub
  const handleLogout = async () => {
    try {
      // Remove auth token from SecureStore
      await deleteAuthToken();
      // Also remove user display data from AsyncStorage
      await removeUserData();
      console.log('Auth token and user data removed, navigating to Welcome.');
      navigation.replace('Welcome');
    } catch (e) {
      console.error('Failed to logout.', e);
    }
  };

  // Ekran ładowania (z Twojego kodu)
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Zabezpieczenie (z Twojego kodu)
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Brak danych użytkownika lub sesja wygasła...</Text>
        <Button title="Przejdź do logowania" onPress={() => navigation.replace('Welcome')} />
      </View>
    );
  }

  // Pierwsza litera imienia do awatara
  const userInitial = user.first_name ? user.first_name[0] : '?';

  // --- Nowy UI (Facebook-style) ---
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. Górny Pasek (Header) */}
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

      {/* 2. Pasek Zakładek (Tabs) */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabButton, styles.tabButtonActive]}>
          <Ionicons name="home" size={26} color="#1877f2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <FontAwesome5 name="user-friends" size={24} color="#606770" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <MaterialCommunityIcons name="television-play" size={28} color="#606770" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <FontAwesome5 name="user-circle" size={24} color="#606770" />
        </TouchableOpacity>
      </View>

      {/* 3. Kanał (Feed) */}
      <ScrollView style={styles.feed}>
        {/* Sekcja "Tworzenie posta" */}
        <View style={styles.createPostContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{userInitial}</Text>
          </View>
          <TextInput
            style={styles.postInput}
            placeholder={`O czym myślisz, ${user.first_name}?`}
            placeholderTextColor="#606770"
          />
        </View>

        {/* Przykładowy Post */}
        <PostCard post={mockPost} />
        {/* Tutaj w przyszłości będzie FlatList z postami z API */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

