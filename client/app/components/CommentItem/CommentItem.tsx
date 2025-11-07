import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Comment } from "../../types/types";
import UserAvatar from "../UserAvatar/UserAvatar";
import LikersModal from "../LikersModal/LikersModal";
import { colors } from "../../theme";
import styles from "./CommentItem.styles";
import { formatTimeAgo } from "../../utils/formatUtils";

interface CommentItemProps {
  comment: Comment;
  onLikePress: () => void;
  commentLikers: any[];
  isLoadingLikers: boolean;
  onShowLikers: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onLikePress,
  commentLikers,
  isLoadingLikers,
  onShowLikers,
}) => {
  const router = useRouter();
  const [showLikersModal, setShowLikersModal] = useState(false);

  const handleAuthorPress = () => {
    router.push({
      pathname: "/profile",
      params: { userId: comment.user_id },
    });
  };

  const handleShowLikers = async () => {
    await onShowLikers();
    setShowLikersModal(true);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleAuthorPress}
          style={styles.pressableArea}
        >
          <UserAvatar avatarUrl={comment.author_avatar_url} size="small" />
          <View style={styles.content}>
            <Text style={styles.author}>{comment.author_name}</Text>
            <Text style={styles.text}>{comment.content}</Text>
            <Text style={styles.time}>{formatTimeAgo(comment.timestamp)}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity onPress={onLikePress}>
            <MaterialCommunityIcons
              name={
                comment.is_liked_by_current_user ? "heart" : "heart-outline"
              }
              size={16}
              color={
                comment.is_liked_by_current_user
                  ? colors.danger
                  : colors.secondaryText
              }
            />
          </TouchableOpacity>
          {comment.like_count > 0 && (
            <TouchableOpacity onPress={handleShowLikers}>
              <Text style={styles.likeCount}>
                {comment.like_count}{" "}
                {comment.like_count === 1 ? "Like" : "Likes"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <LikersModal
        visible={showLikersModal}
        onClose={() => setShowLikersModal(false)}
        likers={commentLikers}
        isLoading={isLoadingLikers}
        likeCount={comment.like_count}
      />
    </>
  );
};

export default CommentItem;
