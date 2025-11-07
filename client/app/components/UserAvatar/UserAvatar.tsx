import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import styles, { AvatarSize } from "./UserAvatar.styles";

const defaultAvatar = require("../../../assets/default_avatar.jpg");

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size: AvatarSize;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatarUrl, size }) => {
  const source: ImageSourcePropType = avatarUrl
    ? { uri: avatarUrl }
    : defaultAvatar;

  const sizeStyle = styles[size];

  return <Image source={source} style={[styles.base, sizeStyle]} />;
};

export default UserAvatar;
