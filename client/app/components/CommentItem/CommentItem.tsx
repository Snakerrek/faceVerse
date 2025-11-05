import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Comment } from "../../types/types";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { colors, spacing, borderRadiuses } from "../../theme";
import { styles } from "./CommentItem.styles";

const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const commentDate = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);
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

  const handleShowLikers = async () => {
    await onShowLikers();
    setShowLikersModal(true);
  };

  const handleLikerPress = (userId: number) => {
    setShowLikersModal(false);
    router.push(`/profile?userId=${userId}`);
  };

  return (
    <>
      <View style={styles.container}>
        <UserAvatar avatarUrl={comment.author_avatar_url} size="small" />

        <View style={styles.content}>
          <Text style={styles.author}>{comment.author_name}</Text>
          <Text style={styles.text}>{comment.content}</Text>
          <Text style={styles.time}>{formatTimeAgo(comment.timestamp)}</Text>

          {comment.like_count > 0 && (
            <TouchableOpacity onPress={handleShowLikers}>
              <Text style={styles.likeCount}>
                {comment.like_count}{" "}
                {comment.like_count === 1 ? "Like" : "Likes"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.likeButton} onPress={onLikePress}>
          <MaterialCommunityIcons
            name={comment.is_liked_by_current_user ? "heart" : "heart-outline"}
            size={16}
            color={
              comment.is_liked_by_current_user
                ? colors.danger
                : colors.secondaryText
            }
          />
        </TouchableOpacity>
      </View>

      {/* Comment Likers Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={showLikersModal}
        onRequestClose={() => setShowLikersModal(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setShowLikersModal(false)}
        >
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: borderRadiuses.small,
              width: "85%",
              maxHeight: "70%",
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.borderLight,
                paddingVertical: spacing.medium,
                paddingHorizontal: spacing.medium,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.primaryText,
                }}
              >
                {commentLikers.length}{" "}
                {commentLikers.length === 1 ? "Like" : "Likes"}
              </Text>
            </View>

            {isLoadingLikers ? (
              <View style={{ padding: spacing.large, alignItems: "center" }}>
                <ActivityIndicator color={colors.blue} size="large" />
              </View>
            ) : commentLikers.length > 0 ? (
              <FlatList
                data={commentLikers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleLikerPress(item.id)}
                    style={{
                      paddingVertical: spacing.medium,
                      paddingHorizontal: spacing.medium,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.borderLight,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <UserAvatar avatarUrl={item.avatar_url} size="small" />
                    <Text
                      style={{
                        fontSize: 16,
                        color: colors.primaryText,
                        fontWeight: "500",
                        marginLeft: spacing.medium,
                      }}
                    >
                      {item.first_name} {item.last_name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={{ padding: spacing.large, alignItems: "center" }}>
                <Text style={{ color: colors.secondaryText }}>
                  No likes yet
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default CommentItem;
