import React from "react";
import { View, Text } from "react-native";
import { UserData } from "../../types/types";
import UserAvatar from "../UserAvatar/UserAvatar";
import ProfileBackground from "../ProfileBackground/ProfileBackground";
import { EditPhotoButton } from "../EditPhotoButton/EditPhotoButton";
import { styles } from "./PhotoEditSection.styles";

interface PhotoEditSectionProps {
  type: "avatar" | "cover";
  user: UserData;
  isLoading: boolean;
  onEditPress: () => void;
}

export const PhotoEditSection: React.FC<PhotoEditSectionProps> = ({
  type,
  user,
  isLoading,
  onEditPress,
}) => {
  const isAvatar = type === "avatar";
  const imageUrl = isAvatar ? user.avatar_url : user.cover_url;

  return (
    <View style={styles.container}>
      {isAvatar ? (
        <>
          <UserAvatar avatarUrl={imageUrl} size="medium" />
          <Text style={styles.label}>Profile Picture</Text>
        </>
      ) : (
        <>
          <ProfileBackground backgroundUrl={imageUrl} context="profile" />
          <Text style={styles.label}>Cover Photo</Text>
        </>
      )}

      <EditPhotoButton
        label={`Change ${isAvatar ? "Profile Picture" : "Cover Photo"}`}
        isLoading={isLoading}
        onPress={onEditPress}
      />
    </View>
  );
};
