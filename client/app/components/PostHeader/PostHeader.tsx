import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Post } from "../../types/types";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { styles } from "./PostHeader.styles";

const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const postDate = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) return Math.floor(interval) + "y";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m";

  return Math.floor(seconds) + "s";
};

interface PostHeaderProps {
  post: Post;
  onAuthorPress: () => void;
  onMenuPress: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  post,
  onAuthorPress,
  onMenuPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onAuthorPress} style={styles.authorInfo}>
        <UserAvatar avatarUrl={post.author_avatar_url} size="small" />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{post.author_name}</Text>
          <Text style={styles.timestamp}>{formatTimeAgo(post.timestamp)}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onMenuPress}>
        <Text style={styles.menuButton}>⋮</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostHeader;
