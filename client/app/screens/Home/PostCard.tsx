import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Post, ResponseStatus, UserData, Comment } from "../../types/types";
import styles from "./HomeScreen.styles";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { useRouter } from "expo-router";
import { toggleLikePost, getPostLikers } from "../../services/postService";
import {
  getCommentsForPost,
  createComment,
  getCommentLikers,
  toggleLikeComment,
} from "../../services/commentService";

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

const CommentItem: React.FC<{
  item: Comment;
  onProfilePress: (id: number) => void;
  onOpenLikersModal: (commentId: number) => void;
}> = ({ item, onProfilePress, onOpenLikersModal }) => {
  const [isLiked, setIsLiked] = useState(item.is_liked_by_current_user);
  const [likeCount, setLikeCount] = useState(item.like_count);
  const [isLoading, setIsLoading] = useState(false);

  const timeAgo = formatTimeAgo(item.timestamp);

  const handleLikeComment = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const originalLiked = isLiked;
    const originalCount = likeCount;
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (originalLiked ? prev - 1 : prev + 1));

    const response = await toggleLikeComment(item.id);

    if (response.status === ResponseStatus.OK && response.data) {
      setIsLiked(response.data.liked);
      setLikeCount(response.data.like_count);
    } else {
      console.error("Failed to like comment:", response.message);
      setIsLiked(originalLiked);
      setLikeCount(originalCount);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.commentItem}>
      <TouchableOpacity onPress={() => onProfilePress(item.user_id)}>
        <UserAvatar avatarUrl={item.author_avatar_url} size="small" />
      </TouchableOpacity>

      <View style={styles.commentContainer}>
        <View style={styles.commentContent}>
          <Text style={styles.likerName}>{item.author_name}</Text>
          <Text>{item.content}</Text>
        </View>

        <View style={styles.commentActions}>
          <TouchableOpacity
            onPress={handleLikeComment}
            disabled={isLoading}
            style={styles.commentActionButton}
          >
            <Text
              style={[
                styles.commentActionText,
                isLiked && styles.commentActionTextLiked,
              ]}
            >
              {isLiked ? "Polubione" : "Lubię to!"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.commentTimestamp}> · {timeAgo}</Text>

          {likeCount > 0 && (
            <TouchableOpacity
              style={styles.commentLikeCountContainer}
              onPress={() => onOpenLikersModal(item.id)}
            >
              <Text style={styles.commentTimestamp}>·</Text>
              <Ionicons
                name="thumbs-up"
                size={12}
                color="#1877F2"
                style={{ marginLeft: 4 }}
              />
              <Text style={styles.commentLikeCountText}>{likeCount}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const postTimestamp = new Date(post.timestamp).toLocaleString();
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(post.is_liked_by_current_user);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [isLoadingLike, setIsLoadingLike] = useState(false);

  const [isLikeModalVisible, setIsLikeModalVisible] = useState(false);
  const [likers, setLikers] = useState<UserData[]>([]);
  const [isLoadingLikers, setIsLoadingLikers] = useState(false);

  const [commentCount, setCommentCount] = useState(post.comment_count);
  const [isCommentSectionVisible, setIsCommentSectionVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  const [isCommentLikerModalVisible, setIsCommentLikerModalVisible] =
    useState(false);
  const [commentLikers, setCommentLikers] = useState<UserData[]>([]);
  const [isLoadingCommentLikers, setIsLoadingCommentLikers] = useState(false);

  const handleProfilePress = (userId: number) => {
    if (isLikeModalVisible) setIsLikeModalVisible(false);
    if (isCommentLikerModalVisible) setIsCommentLikerModalVisible(false);

    router.push({
      pathname: "/profile",
      params: { userId: userId },
    });
  };

  const handleLikePress = async () => {
    if (isLoadingLike) return;
    setIsLoadingLike(true);
    const originalLiked = isLiked;
    const originalCount = likeCount;

    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (originalLiked ? prev - 1 : prev + 1));

    const response = await toggleLikePost(post.id);

    if (response.status === ResponseStatus.OK && response.data) {
      setIsLiked(response.data.liked);
      setLikeCount(response.data.like_count);
    } else {
      console.error("Failed to toggle like:", response.message);
      setIsLiked(originalLiked);
      setLikeCount(originalCount);
    }
    setIsLoadingLike(false);
  };

  const onOpenLikesModal = async () => {
    if (likeCount === 0) return;
    setIsLikeModalVisible(true);
    setIsLoadingLikers(true);
    try {
      const response = await getPostLikers(post.id);
      if (response.status === ResponseStatus.OK && response.data) {
        setLikers(response.data);
      } else {
        console.error("Failed to fetch likers:", response.message);
        setLikers([]);
      }
    } catch (error) {
      console.error("Error fetching likers:", error);
      setLikers([]);
    }
    setIsLoadingLikers(false);
  };

  const onCloseLikesModal = () => {
    setIsLikeModalVisible(false);
    setLikers([]);
  };

  const renderLikerItem = ({ item }: { item: UserData }) => (
    <TouchableOpacity
      style={styles.likerItem}
      onPress={() => handleProfilePress(item.id)}
    >
      <UserAvatar avatarUrl={item.avatar_url} size="small" />
      <Text
        style={styles.likerName}
      >{`${item.first_name} ${item.last_name}`}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoadingComments(true);
      try {
        const response = await getCommentsForPost(post.id);
        if (response.status === ResponseStatus.OK && response.data) {
          setComments(response.data);
        } else {
          console.error("Failed to fetch comments:", response.message);
          setComments([]);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
      setIsLoadingComments(false);
    };
    if (isCommentSectionVisible) {
      fetchComments();
    }
  }, [isCommentSectionVisible, post.id]);

  const onToggleComments = () => {
    setIsCommentSectionVisible((prev) => !prev);
  };

  const handleCreateComment = async () => {
    if (!newComment.trim() || isPostingComment) return;
    setIsPostingComment(true);
    const response = await createComment(post.id, newComment);
    if (response.status === ResponseStatus.OK && response.data) {
      setComments((prevComments) => [...prevComments, response.data.comment]);
      setCommentCount((prevCount) => prevCount + 1);
      setNewComment("");
    } else {
      console.error("Failed to create comment:", response.message);
    }
    setIsPostingComment(false);
  };

  const onOpenCommentLikersModal = async (commentId: number) => {
    setIsCommentLikerModalVisible(true);
    setIsLoadingCommentLikers(true);
    try {
      const response = await getCommentLikers(commentId);
      if (response.status === ResponseStatus.OK && response.data) {
        setCommentLikers(response.data);
      } else {
        console.error("Failed to fetch comment likers:", response.message);
        setCommentLikers([]);
      }
    } catch (error) {
      console.error("Error fetching comment likers:", error);
      setCommentLikers([]);
    }
    setIsLoadingCommentLikers(false);
  };

  const onCloseCommentLikersModal = () => {
    setIsCommentLikerModalVisible(false);
    setCommentLikers([]);
  };

  const renderCommentItem = ({ item }: { item: Comment }) => (
    <CommentItem
      item={item}
      onProfilePress={handleProfilePress}
      onOpenLikersModal={onOpenCommentLikersModal}
    />
  );

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <TouchableOpacity
          style={styles.postHeader}
          onPress={() => handleProfilePress(post.user_id)}
        >
          <UserAvatar avatarUrl={post.author_avatar_url} size="small" />
          <View style={styles.postHeaderText}>
            <Text style={styles.postUserName}>{post.author_name}</Text>
            <Text style={styles.postTimestamp}>{postTimestamp}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>
      {post.image_url && (
        <View style={styles.postImageContainer}>
          <Image
            source={{ uri: post.image_url }}
            style={styles.postImage}
            resizeMode="contain"
          />
        </View>
      )}

      <View style={styles.postStatsContainer}>
        {likeCount > 0 && (
          <TouchableOpacity
            onPress={onOpenLikesModal}
            style={styles.likeCountContainer}
            disabled={isLoadingLikers}
          >
            <Ionicons name="thumbs-up" size={14} color="#1877F2" />
            <Text style={styles.likeCountText}>{likeCount}</Text>
          </TouchableOpacity>
        )}
        {commentCount > 0 && (
          <TouchableOpacity
            onPress={onToggleComments}
            style={styles.commentCountContainer}
            disabled={isLoadingComments}
          >
            <Text style={styles.commentCountText}>
              {commentCount} {commentCount === 1 ? "Komentarz" : "Komentarzy"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.postSeparator} />
      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleLikePress}
          disabled={isLoadingLike}
        >
          <Ionicons
            name={isLiked ? "thumbs-up" : "thumbs-up-outline"}
            size={20}
            style={styles.iconSecondary}
            color={isLiked ? "#1877F2" : styles.iconSecondary?.color || "grey"}
          />
          <Text
            style={[
              styles.actionText,
              isLiked && { color: "#1877F2", fontWeight: "bold" },
            ]}
          >
            Lubię to!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onToggleComments}
        >
          <MaterialCommunityIcons
            name="comment-outline"
            size={20}
            style={styles.iconSecondary}
          />
          <Text style={styles.actionText}>Komentarz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons
            name="share-outline"
            size={20}
            style={styles.iconSecondary}
          />
          <Text style={styles.actionText}>Udostępnij</Text>
        </TouchableOpacity>
      </View>
      {isCommentSectionVisible && (
        <View>
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Napisz komentarz..."
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity
              onPress={handleCreateComment}
              disabled={isPostingComment || !newComment.trim()}
              style={styles.commentSendButton}
            >
              {isPostingComment ? (
                <ActivityIndicator size="small" color="#1877F2" />
              ) : (
                <Ionicons
                  name="send"
                  size={24}
                  color={!newComment.trim() ? "#B0B3B8" : "#1877F2"}
                />
              )}
            </TouchableOpacity>
          </View>
          {isLoadingComments ? (
            <ActivityIndicator
              size="large"
              color="#1877F2"
              style={{ padding: 20 }}
            />
          ) : (
            <FlatList
              data={comments}
              renderItem={renderCommentItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              ListEmptyComponent={
                <View style={styles.emptyListContainer}>
                  <Text style={styles.emptyListText}>
                    Brak komentarzy. Bądź pierwszą osobą!
                  </Text>
                </View>
              }
            />
          )}
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLikeModalVisible}
        onRequestClose={onCloseLikesModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={onCloseLikesModal}
        >
          <SafeAreaView
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Polubienia (Post)</Text>
              <TouchableOpacity
                onPress={onCloseLikesModal}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close-circle" size={28} color="#65676B" />
              </TouchableOpacity>
            </View>
            {isLoadingLikers ? (
              <ActivityIndicator
                size="large"
                color="#1877F2"
                style={{ padding: 20, flex: 1 }}
              />
            ) : (
              <FlatList
                data={likers}
                renderItem={renderLikerItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                  <View style={styles.emptyListContainer}>
                    <Text style={styles.emptyListText}>
                      Brak polubień do wyświetlenia.
                    </Text>
                  </View>
                }
              />
            )}
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCommentLikerModalVisible}
        onRequestClose={onCloseCommentLikersModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={onCloseCommentLikersModal}
        >
          <SafeAreaView
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Polubienia (Komentarz)</Text>
              <TouchableOpacity
                onPress={onCloseCommentLikersModal}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close-circle" size={28} color="#65676B" />
              </TouchableOpacity>
            </View>
            {isLoadingCommentLikers ? (
              <ActivityIndicator
                size="large"
                color="#1877F2"
                style={{ padding: 20, flex: 1 }}
              />
            ) : (
              <FlatList
                data={commentLikers}
                renderItem={renderLikerItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                  <View style={styles.emptyListContainer}>
                    <Text style={styles.emptyListText}>
                      Brak polubień do wyświetlenia.
                    </Text>
                  </View>
                }
              />
            )}
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PostCard;
