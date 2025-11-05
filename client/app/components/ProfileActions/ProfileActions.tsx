import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./ProfileActions.styles";
import { useRouter } from "expo-router";

interface ProfileActionsProps {
  isCurrentUser: boolean;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({
  isCurrentUser,
}) => {
  const router = useRouter();

  const navigateToSettings = () => {
    router.push("/settings");
  };

  const onAddFiend = () => {};

  if (isCurrentUser) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={navigateToSettings}
        >
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.actionButton} onPress={onAddFiend}>
        <Text style={styles.actionButtonText}>Add Friend</Text>
      </TouchableOpacity>
    </View>
  );
};
