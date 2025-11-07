import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./ProfileActions.styles";
import { useRouter } from "expo-router";
import FriendButton from "../FriendButton/FriendButton";

interface ProfileActionsProps {
  isCurrentUser: boolean;
  userId?: number;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  isCurrentUser,
  userId,
}) => {
  const router = useRouter();

  const navigateToSettings = () => {
    router.push("/settings");
  };

  const handleViewFriends = () => {
    router.push(`/friends?userId=${userId}` as any);
  };

  if (isCurrentUser) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={navigateToSettings}
        >
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleViewFriends}
        >
          <Text style={styles.actionButtonText}>View Friends list</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (userId) {
    return (
      <View style={styles.container}>
        <FriendButton userId={userId} />
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleViewFriends}
        >
          <Text style={styles.actionButtonText}>View Friend list</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default ProfileActions;
