import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import { UserData } from "../../types/types";
import { getUserData } from "../../utils/storageUtils";
import PostFeed from "../../components/PostFeed/PostFeed";
import SearchScreen from "../Search/SearchScreen";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import TabBar from "../../components/TabBar/TabBar";
import { colors } from "../../theme";
import styles from "./HomeScreen.styles";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useLanguage } from "../../locales/LanguageContext";

type ActiveTab = "home" | "search";

const HomeScreen: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  useAuthCheck(true);
  const { t } = useLanguage();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setIsLoading(true);
    const userData = await getUserData();
    if (userData) {
      setUser(userData);
    }
    setIsLoading(false);
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
        <Text style={styles.errorText}>
          {t("error")}: {t("userNotFound")}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <HomeHeader />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <View style={styles.contentContainer}>
        {activeTab === "home" ? <PostFeed user={user} /> : <SearchScreen />}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
