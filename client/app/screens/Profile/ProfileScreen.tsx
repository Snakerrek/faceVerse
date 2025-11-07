import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import styles from "./ProfileScreen.styles";
import { colors } from "../..//theme";
import useProfile from "../../hooks/useProfile";
import useAuthCheck from "../../hooks/useAuthCheck";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import PostCard from "../../components/PostCard/PostCard";
import { useLanguage } from "../../locales/LanguageContext";

const ProfileScreen: React.FC = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const targetUserId = userId ? parseInt(userId, 10) : null;
  useAuthCheck(true);
  const { profileUser, posts, isLoading } = useProfile(targetUserId);
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  if (!profileUser) {
    return (
      <View style={styles.errorText}>
        <Text style={styles.errorText}>{t("userNotFound")}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        ListHeaderComponent={<ProfileHeader user={profileUser} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{t("noPostsYet")}</Text>
        }
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
