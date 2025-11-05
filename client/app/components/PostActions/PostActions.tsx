import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./PostActions.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../theme";

interface PostActionsProps {
  isLiked: boolean;
  likeCount: number;
  onLikePress: () => void;
  commentCount: number;
  onShowLikers: () => void;
  onCommentPress: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  isLiked,
  likeCount,
  commentCount,
  onLikePress,
  onShowLikers,
  onCommentPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.heartButton} onPress={onLikePress}>
        <MaterialCommunityIcons
          name={isLiked ? "heart" : "heart-outline"}
          size={20}
          color={isLiked ? colors.danger : colors.primaryText}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.likesButton} onPress={onShowLikers}>
        <Text style={styles.text}>
          {likeCount} {likeCount === 1 ? "Like" : "Likes"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onCommentPress}>
        <Text style={styles.text}>
          {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostActions;
