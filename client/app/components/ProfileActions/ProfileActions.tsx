import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./ProfileActions.styles";

interface ProfileActionsProps {
  isCurrentUser: boolean;
  onEditProfile: () => void;
  onAddFriend?: () => void;
  onMessage?: () => void;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({
  isCurrentUser,
  onEditProfile,
  onAddFriend,
  onMessage,
}) => {
  if (isCurrentUser) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.actionButton} onPress={onEditProfile}>
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.actionButton} onPress={onAddFriend}>
        <Text style={styles.actionButtonText}>Add Friend</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={onMessage}>
        <Text style={styles.actionButtonText}>Message</Text>
      </TouchableOpacity>
    </View>
  );
};
