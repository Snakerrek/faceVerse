import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Post, ResponseStatus, UserData } from "../../types/types";
import styles from "./HomeScreen.styles";
import UserAvatar from "../../components/UserAvatar";
import { useRouter } from "expo-router";
import { toggleLikePost, getPostLikers } from "./../../backendService";

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const postTimestamp = new Date(post.timestamp).toLocaleString();
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(post.is_liked_by_current_user);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [isLoadingLike, setIsLoadingLike] = useState(false);

  const [isLikeModalVisible, setIsLikeModalVisible] = useState(false);
  const [likers, setLikers] = useState<UserData[]>([]);
  const [isLoadingLikers, setIsLoadingLikers] = useState(false);

  const handleProfilePress = (userId: number) => {
    if (isLikeModalVisible) {
      setIsLikeModalVisible(false);
    }
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

      {likeCount > 0 && (
        <TouchableOpacity
          onPress={onOpenLikesModal}
          style={styles.likeCountContainer}
          disabled={isLoadingLikers} // Disable while loading
        >
          <Ionicons name="thumbs-up" size={14} color="#1877F2" />
          <Text style={styles.likeCountText}>{likeCount}</Text>
        </TouchableOpacity>
      )}

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
        <TouchableOpacity style={styles.actionButton}>
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
              <Text style={styles.modalTitle}>Polubienia</Text>
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
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
