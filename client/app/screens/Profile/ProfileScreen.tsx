import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { styles } from "./ProfileScreen.styles";
import { useProfile } from "../../hooks/useProfile";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import PostCard from "../../components/PostCard/PostCard";

const ProfileScreen: React.FC = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const targetUserId = userId ? parseInt(userId, 10) : null;
  useAuthCheck(true);
  const { profileUser, posts, isLoading } = useProfile(targetUserId);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!profileUser) {
    return (
      <View style={styles.errorText}>
        <Text style={styles.errorText}>User not found</Text>
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
        ListEmptyComponent={<Text style={styles.emptyText}>No posts yet.</Text>}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
