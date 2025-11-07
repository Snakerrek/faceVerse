import React from "react";
import { View, Text, Image } from "react-native";
import { Post } from "../../types/types";
import styles from "./PostContent.styles";

interface PostContentProps {
  post: Post;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{post.content}</Text>
      {post.image_url && (
        <Image source={{ uri: post.image_url }} style={styles.image} />
      )}
    </View>
  );
};

export default PostContent;
