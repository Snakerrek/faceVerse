import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getFriendsList } from "../../services/friendshipService";
import { ResponseStatus, Friend } from "../../types/types";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import styles from "./FriendsScreen.styles";
import { colors } from "../../theme";

interface FriendsScreenParams {
  userId?: string;
}

const FriendsScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams() as FriendsScreenParams;
  const targetUserId = params.userId ? parseInt(params.userId, 10) : undefined;

  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFriends();
  }, [targetUserId]);

  const fetchFriends = async () => {
    setLoading(true);
    try {
      const response = await getFriendsList(targetUserId);
      if (response.status === ResponseStatus.OK && response.data) {
        setFriends(response.data);
      }
    } catch (error) {
      console.error("Error fetching friends:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFriendPress = (friendId: number) => {
    router.push(`/profile?userId=${friendId}`);
  };

  const renderFriend = ({ item }: { item: Friend }) => (
    <TouchableOpacity
      style={styles.friendItem}
      onPress={() => handleFriendPress(item.id)}
    >
      <UserAvatar avatarUrl={item.avatar_url} size="small" />

      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>
          {item.first_name} {item.last_name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.blue} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.count}>{friends.length} friends</Text>
        </View>
      </View>

      {friends.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No friends yet</Text>
        </View>
      ) : (
        <FlatList
          data={friends}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFriend}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

export default FriendsScreen;
