import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { getUserData } from "../utils/storageUtils";
import { UserData, Post, ResponseStatus } from "../types/types";
import { getUserById } from "../services/userService";
import { getPostsByUserId } from "../services/postService";

const useProfile = (targetUserId: number | null) => {
  const [profileUser, setProfileUser] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProfileData();
  }, [targetUserId]);

  const fetchUserData = async (): Promise<{
    user: UserData | null;
    userId: number | null;
  }> => {
    if (targetUserId) {
      const userRes = await getUserById(targetUserId);
      if (userRes.status === ResponseStatus.OK && userRes.data) {
        return { user: userRes.data, userId: targetUserId };
      } else {
        Alert.alert("Error", "Could not find user.");
        router.back();
        return { user: null, userId: null };
      }
    } else {
      const loggedInUser = await getUserData();
      if (loggedInUser) {
        return { user: loggedInUser, userId: loggedInUser.id };
      } else {
        router.replace("/");
        return { user: null, userId: null };
      }
    }
  };

  const fetchUserPosts = async (userId: number) => {
    const postsRes = await getPostsByUserId(userId);
    if (postsRes.status === ResponseStatus.OK && postsRes.data) {
      setPosts(postsRes.data);
    }
  };

  const fetchProfileData = async () => {
    setIsLoading(true);

    try {
      const { user, userId } = await fetchUserData();

      if (!user || !userId) {
        return;
      }

      setProfileUser(user);
      await fetchUserPosts(userId);
    } catch (error) {
      console.error("Profile fetch error:", error);
      Alert.alert("Error", "Failed to load profile data.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profileUser,
    posts,
    isLoading,
  };
};

export default useProfile;
