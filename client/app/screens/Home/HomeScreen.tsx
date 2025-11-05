import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { UserData } from "../../types/types";
import { getAuthToken, deleteAuthToken } from "../../utils/authUtils";
import { getUserData, removeUserData } from "../../utils/storageUtils";
import PostFeed from "../../components/PostFeed/PostFeed";
import SearchScreen from "../Search/SearchScreen";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import TabBar from "../../components/TabBar/TabBar";
import MenuModal from "../../components/MenuModal/MenuModal";
import { colors } from "../../theme";
import { styles } from "./HomeScreen.styles";

type ActiveTab = "home" | "search";

const HomeScreen: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    verifyAuthAndLoadUser();
  }, []);

  const verifyAuthAndLoadUser = async () => {
    setIsLoading(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        router.replace("/");
        return;
      }

      const userData = await getUserData();
      if (userData) {
        setUser(userData);
      } else {
        await handleLogout();
      }
    } catch (error) {
      console.error("Auth check error:", error);
      router.replace("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await deleteAuthToken();
      await removeUserData();
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to logout");
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue} />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: User not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <HomeHeader
        onNotificationsPress={() => {}}
        onMenuPress={() => setShowMenu(true)}
      />

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <View style={styles.contentContainer}>
        {activeTab === "home" ? (
          <PostFeed userId={user.id} user={user} />
        ) : (
          <SearchScreen />
        )}
      </View>

      <MenuModal
        visible={showMenu}
        onClose={() => setShowMenu(false)}
        onLogout={handleLogout}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
