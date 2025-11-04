import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getUserData } from "../../utils/storageUtils";
import { UserData, Post, ResponseStatus } from "../../types/types";
import { getUserById } from "../../services/userService";
import { getPostsByUserId } from "../../services/postService";
import styles from "./ProfileScreen.styles";
import { colors } from "../../theme";
import PostCard from "../Home/PostCard";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import ProfileBackground from "../../components/ProfileBackground/ProfileBackground";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ProfileParams {
  userId?: string;
}

const ProfileScreen: React.FC = () => {
  const params = useLocalSearchParams() as ProfileParams;
  const router = useRouter();

  const [profileUser, setProfileUser] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const targetUserId = params.userId ? parseInt(params.userId, 10) : null;

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      let userToView: UserData | null = null;
      let userIdToFetch: number | null = null;

      try {
        if (targetUserId) {
          userIdToFetch = targetUserId;
          const userRes = await getUserById(userIdToFetch);
          if (userRes.status === ResponseStatus.OK && userRes.data) {
            userToView = userRes.data;
          } else {
            Alert.alert("Error", "Could not find user.");
            router.back();
            return;
          }
        } else {
          const loggedInUser = await getUserData();
          if (loggedInUser) {
            userIdToFetch = loggedInUser.id;
            userToView = loggedInUser;
          } else {
            router.replace("/");
            return;
          }
        }

        setProfileUser(userToView);

        if (userIdToFetch) {
          const postsRes = await getPostsByUserId(userIdToFetch);
          if (postsRes.status === ResponseStatus.OK && postsRes.data) {
            setPosts(postsRes.data);
          }
        }
      } catch (e) {
        console.error("Profile fetch error:", e);
        Alert.alert("Error", "Failed to load profile data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [targetUserId]);

  const formatDOB = (dateString: string | null | undefined) => {
    if (!dateString) return "Not set";
    try {
      const parts = dateString.split("T")[0].split("-");
      const date = new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
      );
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const renderProfileHeader = () => {
    if (!profileUser) return null;

    const isCurrentUser = targetUserId === null;
    const backgroundUrl = profileUser.cover_url;

    return (
      <View>
        <ProfileBackground backgroundUrl={backgroundUrl} context="profile" />

        <View style={styles.profileContent}>
          <View style={styles.avatarContainer}>
            <UserAvatar avatarUrl={profileUser.avatar_url} size="large" />
          </View>

          <Text
            style={styles.name}
          >{`${profileUser.first_name} ${profileUser.last_name}`}</Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color={colors.blue}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>{profileUser.email}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="cake-variant-outline"
                size={24}
                color={colors.blue}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>
                Born {formatDOB(profileUser.date_of_birth)}
              </Text>
            </View>

            <View style={styles.infoRowLast}>
              <MaterialCommunityIcons
                name="account-outline"
                size={24}
                color={colors.blue}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>
                {profileUser.gender || "Not specified"}
              </Text>
            </View>
          </View>

          <View style={styles.actionButtonRow}>
            {isCurrentUser ? (
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: colors.iconBackground },
                ]}
                onPress={() => router.push("/settings")}
              >
                <Text
                  style={[
                    styles.actionButtonText,
                    { color: colors.primaryText },
                  ]}
                >
                  Edit Profile
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Add Friend</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        <Text style={styles.postsSectionTitle}>Posts</Text>
      </View>
    );
  };

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
        <Text style={[styles.postsSectionTitle, { textAlign: "center" }]}>
          Error: Profile not found.
        </Text>
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
        ListHeaderComponent={renderProfileHeader()}
        ListEmptyComponent={
          <Text style={[styles.postsSectionTitle, { textAlign: "center" }]}>
            No posts yet.
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
