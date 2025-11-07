import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { UserData } from "../../types/types";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useRouter } from "expo-router";
import styles from "./UserSearchCard.styles";
import ProfileBackground from "../../components/ProfileBackground/ProfileBackground";

interface UserSearchCardProps {
  user: UserData;
}

const UserSearchCard: React.FC<UserSearchCardProps> = ({ user }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/profile",
      params: { userId: user.id },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <ProfileBackground backgroundUrl={user.cover_url} context="searchCard" />
      <UserAvatar avatarUrl={user.avatar_url} size="medium" />
      <View style={styles.textContainer}>
        <Text
          style={styles.name}
        >{`${user.first_name} ${user.last_name}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserSearchCard;
