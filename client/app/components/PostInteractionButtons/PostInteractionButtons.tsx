import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../theme";
import { styles } from "./PostInteractionButtons.styles";

interface PostInteractionButtonsProps {
  isLiked: boolean;
  onLikePress: () => void;
  onCommentPress: () => void;
}

const PostInteractionButtons: React.FC<PostInteractionButtonsProps> = ({
  isLiked,
  onLikePress,
  onCommentPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onLikePress}>
        <MaterialCommunityIcons
          name={isLiked ? "heart" : "heart-outline"}
          size={20}
          color={isLiked ? colors.danger : colors.primaryText}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onCommentPress}>
        <MaterialCommunityIcons
          name="comment-outline"
          size={20}
          color={colors.primaryText}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PostInteractionButtons;
