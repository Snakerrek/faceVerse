import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./PostActions.styles";

interface PostActionsProps {
  likeCount: number;
  commentCount: number;
  onShowLikers: () => void;
  onCommentPress: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  likeCount,
  commentCount,
  onShowLikers,
  onCommentPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onShowLikers}>
        <Text style={styles.text}>{likeCount} Likes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onCommentPress}>
        <Text style={styles.text}>{commentCount} Comments</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostActions;
