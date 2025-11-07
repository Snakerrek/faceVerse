import React from "react";
import { View, Text } from "react-native";
import { UserData } from "../../types/types";
import UserAvatar from "../UserAvatar/UserAvatar";
import ProfileBackground from "../ProfileBackground/ProfileBackground";
import EditPhotoButton from "../EditPhotoButton/EditPhotoButton";
import styles from "./PhotoEditSection.styles";
import { useLanguage } from "../../locales/LanguageContext";

interface PhotoEditSectionProps {
  type: "avatar" | "cover";
  user: UserData;
  isLoading: boolean;
  onEditPress: () => void;
}

const PhotoEditSection: React.FC<PhotoEditSectionProps> = ({
  type,
  user,
  isLoading,
  onEditPress,
}) => {
  const { t } = useLanguage();
  const isAvatar = type === "avatar";
  const imageUrl = isAvatar ? user.avatar_url : user.cover_url;

  return (
    <View style={styles.container}>
      {isAvatar ? (
        <>
          <UserAvatar avatarUrl={imageUrl} size="medium" />
          <Text style={styles.label}>{t("profilePicture")}</Text>
        </>
      ) : (
        <>
          <ProfileBackground backgroundUrl={imageUrl} context="profile" />
          <Text style={styles.label}>{t("coverPicture")}</Text>
        </>
      )}

      <EditPhotoButton
        label={`${t("change")} ${isAvatar ? t("profilePicture").toLowerCase() : t("coverPicture").toLowerCase()}`}
        isLoading={isLoading}
        onPress={onEditPress}
      />
    </View>
  );
};

export default PhotoEditSection;
