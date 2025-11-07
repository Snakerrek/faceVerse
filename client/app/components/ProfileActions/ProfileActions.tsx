import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./ProfileActions.styles";
import { useRouter } from "expo-router";
import FriendButton from "../FriendButton/FriendButton";
import { useLanguage } from "../../locales/LanguageContext";

interface ProfileActionsProps {
  isCurrentUser: boolean;
  userId?: number;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  isCurrentUser,
  userId,
}) => {
  const { t } = useLanguage();
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
          <Text style={styles.actionButtonText}>{t("editProfile")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleViewFriends}
        >
          <Text style={styles.actionButtonText}>{t("friendsList")}</Text>
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
          <Text style={styles.actionButtonText}>{t("friendsList")}</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default ProfileActions;
