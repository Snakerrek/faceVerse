import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Post } from "../../types/types";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import styles from "./PostHeader.styles";
import { useRouter } from "expo-router";
import { formatTimeAgo } from "../../utils/formatUtils";

interface PostHeaderProps {
  post: Post;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const router = useRouter();
  const onAuthorPress = () => router.push(`/profile?userId=${post.user_id}`);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onAuthorPress} style={styles.authorInfo}>
        <UserAvatar avatarUrl={post.author_avatar_url} size="small" />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{post.author_name}</Text>
          <Text style={styles.timestamp}>{formatTimeAgo(post.timestamp)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostHeader;
