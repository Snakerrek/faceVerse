import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { UserData } from "../../types/types";
import UserAvatar from "../UserAvatar/UserAvatar";
import ProfileBackground from "../ProfileBackground/ProfileBackground";
import { ProfileInfo } from "../ProfileInfo/ProfileInfo";
import { ProfileActions } from "../ProfileActions/ProfileActions";
import { styles } from "./ProfileHeader.styles";
import { getLoggedInUserID } from "@/app/utils/storageUtils";

interface ProfileHeaderProps {
  user: UserData;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);

  useEffect(() => {
    const checkIsCurrentUser = async () => {
      try {
        const loggedInUserID = await getLoggedInUserID();
        setIsCurrentUser(loggedInUserID === user.id);
      } catch (error) {
        console.error("Failed to get logged in user ID:", error);
        setIsCurrentUser(false);
      }
    };

    checkIsCurrentUser();
  }, [user.id]);

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

        <ProfileActions isCurrentUser={isCurrentUser} />

        <Text style={styles.postsSectionTitle}>Posts</Text>
      </View>
    </>
  );
};
