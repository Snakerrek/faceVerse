import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useProfile } from "../../hooks/useProfile";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import PostCard from "../Home/PostCard";
import { styles } from "./ProfileScreen.styles";
import { colors } from "../../theme";

interface ProfileParams {
  userId?: string;
}

const ProfileScreen: React.FC = () => {
  const params = useLocalSearchParams() as ProfileParams;
  const targetUserId = params.userId ? parseInt(params.userId, 10) : null;

  const { profileUser, posts, isLoading, isCurrentUser, navigateToSettings } =
    useProfile(targetUserId);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          size="large"
          color={colors.blue}
          style={styles.loader}
        />
      </SafeAreaView>
    );
  }

  if (!profileUser) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error: Profile not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        ListHeaderComponent={
          <ProfileHeader
            user={profileUser}
            isCurrentUser={isCurrentUser}
            onEditProfile={navigateToSettings}
          />
        }
        ListEmptyComponent={<Text style={styles.emptyText}>No posts yet.</Text>}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
