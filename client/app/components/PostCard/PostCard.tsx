import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Post, ResponseStatus } from "../../types/types";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { toggleLikePost, getPostLikers } from "../../services/postService";
import {
  getCommentsForPost,
  createComment,
  toggleLikeComment,
  getCommentLikers,
} from "../../services/commentService";
import PostHeader from "../PostHeader/PostHeader";
import PostContent from "../PostContent/PostContent";
import PostActions from "../PostActions/PostActions";
import CommentInputField from "../CommentInputField/CommentInputField";
import CommentItem from "../CommentItem/CommentItem";
import { styles } from "./PostCard.styles";
import { colors } from "../../theme";

interface PostCardProps {
  post: Post;
  expandedByDefault?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, expandedByDefault }) => {
  const router = useRouter();

  // Post likes state
  const [isLiked, setIsLiked] = useState(post.is_liked_by_current_user);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [likers, setLikers] = useState<any[]>([]);
  const [isLoadingLikers, setIsLoadingLikers] = useState(false);
  const [showLikers, setShowLikers] = useState(false);

  // Comments state
  const [showComments, setShowComments] = useState(expandedByDefault);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  // Comment likes state
  const [commentLikers, setCommentLikers] = useState<any[]>([]);
  const [isLoadingCommentLikers, setIsLoadingCommentLikers] = useState(false);

  useEffect(() => {
    if (expandedByDefault) {
      handleFetchComments();
    }
  }, []);

  // POST LIKE HANDLERS
  const handleToggleLike = async () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    try {
      const response = await toggleLikePost(post.id);
      if (response.status !== ResponseStatus.OK) {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount + 1 : likeCount - 1);
        Alert.alert("Error", "Failed to update like status.");
      }
    } catch (error) {
      console.error("Toggle like error:", error);
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount + 1 : likeCount - 1);
    }
  };

  const handleGetLikers = async () => {
    setIsLoadingLikers(true);
    try {
      const response = await getPostLikers(post.id);
      if (response.status === ResponseStatus.OK && response.data) {
        setLikers(response.data);
      } else {
        Alert.alert("Error", "Failed to load likers.");
      }
    } catch (error) {
      console.error("Get likers error:", error);
      Alert.alert("Error", "An error occurred.");
    } finally {
      setIsLoadingLikers(false);
    }
  };

  const handleShowLikers = async () => {
    await handleGetLikers();
    setShowLikers(true);
  };

  // COMMENT HANDLERS
  const handleFetchComments = async () => {
    setIsLoadingComments(true);
    try {
      const response = await getCommentsForPost(post.id);
      if (response.status === ResponseStatus.OK && response.data) {
        setComments(response.data);
      } else {
        Alert.alert("Error", "Failed to load comments.");
      }
    } catch (error) {
      console.error("Fetch comments error:", error);
      Alert.alert("Error", "An error occurred.");
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleCommentButtonPress = async () => {
    if (showComments) {
      setShowComments(false);
    } else {
      await handleFetchComments();
      setShowComments(true);
    }
  };

  const handleCreateComment = async () => {
    if (!newCommentContent.trim()) {
      Alert.alert("Error", "Comment cannot be empty.");
      return;
    }

    setIsPostingComment(true);
    try {
      const response = await createComment(post.id, newCommentContent);
      if (response.status === ResponseStatus.OK && response.data?.comment) {
        setComments([...comments, response.data.comment]);
        setNewCommentContent("");
      } else {
        Alert.alert("Error", "Failed to post comment.");
      }
    } catch (error) {
      console.error("Create comment error:", error);
      Alert.alert("Error", "An error occurred.");
    } finally {
      setIsPostingComment(false);
    }
  };

  const handleToggleLikeComment = async (
    commentId: number,
    currentlyLiked: boolean
  ) => {
    try {
      const response = await toggleLikeComment(commentId);
      if (response.status === ResponseStatus.OK) {
        setComments(
          comments.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  is_liked_by_current_user: !currentlyLiked,
                  like_count: currentlyLiked
                    ? c.like_count - 1
                    : c.like_count + 1,
                }
              : c
          )
        );
      }
    } catch (error) {
      console.error("Toggle comment like error:", error);
    }
  };

  const handleGetCommentLikers = async (commentId: number) => {
    setIsLoadingCommentLikers(true);
    try {
      const response = await getCommentLikers(commentId);
      if (response.status === ResponseStatus.OK && response.data) {
        setCommentLikers(response.data);
      } else {
        Alert.alert("Error", "Failed to load likers.");
      }
    } catch (error) {
      console.error("Get comment likers error:", error);
      Alert.alert("Error", "An error occurred.");
    } finally {
      setIsLoadingCommentLikers(false);
    }
  };

  return (
    <>
      <View style={styles.card}>
        <PostHeader post={post} />
        <PostContent post={post} />
        <PostActions
          isLiked={isLiked}
          onLikePress={handleToggleLike}
          likeCount={likeCount}
          commentCount={showComments ? comments.length : post.comment_count}
          onShowLikers={handleShowLikers}
          onCommentPress={handleCommentButtonPress}
        />
        {showComments && (
          <>
            {isLoadingComments ? (
              <ActivityIndicator
                style={styles.commentsLoadingContainer}
                color={colors.blue}
              />
            ) : (
              <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <CommentItem
                    comment={item}
                    onLikePress={() =>
                      handleToggleLikeComment(
                        item.id,
                        item.is_liked_by_current_user
                      )
                    }
                    commentLikers={commentLikers}
                    isLoadingLikers={isLoadingCommentLikers}
                    onShowLikers={() => handleGetCommentLikers(item.id)}
                  />
                )}
                scrollEnabled={false}
              />
            )}
            {/* tutaj */}
            <CommentInputField
              value={newCommentContent}
              onChangeText={setNewCommentContent}
              onSubmit={handleCreateComment}
              isLoading={isPostingComment}
            />
          </>
        )}
      </View>

      {/* Likers Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={showLikers}
        onRequestClose={() => setShowLikers(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowLikers(false)}
        >
          <View style={styles.likersModalContent}>
            {/* Header */}
            <View style={styles.likersHeader}>
              <Text style={styles.likersHeaderText}>
                {likeCount} {likeCount === 1 ? "Like" : "Likes"}
              </Text>
            </View>

            {/* Likers List */}
            {isLoadingLikers ? (
              <View style={styles.likersLoadingContainer}>
                <ActivityIndicator color={colors.blue} size="large" />
              </View>
            ) : likers.length > 0 ? (
              <FlatList
                data={likers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setShowLikers(false);
                      router.push(`/profile?userId=${item.id}`);
                    }}
                    style={styles.likerItem}
                  >
                    <UserAvatar avatarUrl={item.avatar_url} size="small" />
                    <Text style={styles.likerItemText}>
                      {item.first_name} {item.last_name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={styles.likersEmptyContainer}>
                <Text style={styles.likersEmptyText}>No likes yet</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default PostCard;
