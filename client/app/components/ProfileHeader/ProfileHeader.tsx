import React from "react";
import { View, Text } from "react-native";
import { UserData } from "../../types/types";
import UserAvatar from "../UserAvatar/UserAvatar";
import ProfileBackground from "../ProfileBackground/ProfileBackground";
import { ProfileInfo } from "../ProfileInfo/ProfileInfo";
import { ProfileActions } from "../ProfileActions/ProfileActions";
import { styles } from "./ProfileHeader.styles";

interface ProfileHeaderProps {
  user: UserData;
  isCurrentUser: boolean;
  onEditProfile: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isCurrentUser,
  onEditProfile,
}) => {
  return (
    <>
      <ProfileBackground backgroundUrl={user.cover_url} context="profile" />
      <View style={styles.profileContent}>
        <View style={styles.avatarContainer}>
          <UserAvatar avatarUrl={user.avatar_url} size={"medium"} />
        </View>

        <Text style={styles.name}>
          {`${user.first_name} ${user.last_name}`}
        </Text>

        <ProfileInfo user={user} />

        <ProfileActions
          isCurrentUser={isCurrentUser}
          onEditProfile={onEditProfile}
        />

        <Text style={styles.postsSectionTitle}>Posts</Text>
      </View>
    </>
  );
};
