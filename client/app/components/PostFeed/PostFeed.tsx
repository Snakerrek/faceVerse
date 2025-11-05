import React, { useState, useEffect } from "react";
import {
  FlatList,
  ActivityIndicator,
  Text,
  SafeAreaView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Post,
  CreatePostData,
  ResponseStatus,
  UserData,
} from "../../types/types";
import { getPosts, createPost } from "../../services/postService";
import CreatePostSection from "../CreatePostSection/CreatePostSection";
import PostCard from "../PostCard/PostCard";
import { colors } from "../../theme";
import { styles } from "./PostFeed.styles";

interface PostFeedProps {
  user: UserData;
}

const PostFeed: React.FC<PostFeedProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await getPosts();
      if (response.status === ResponseStatus.OK && response.data) {
        setPosts(response.data);
      } else {
        Alert.alert("Error", response.message || "Failed to fetch posts.");
      }
    } catch (error) {
      console.error("Fetch posts error:", error);
      Alert.alert("Error", "An error occurred while fetching posts.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim() && !selectedImageUri) {
      Alert.alert("Error", "Post content or image is required.");
      return;
    }

    setIsPosting(true);
    try {
      const postData: CreatePostData = {
        content: newPostContent,
        localImageUri: selectedImageUri,
      };

      const response = await createPost(postData);
      if (response.status === ResponseStatus.OK && response.data) {
        setPosts([response.data, ...posts]);
        setNewPostContent("");
        setSelectedImageUri(null);
      } else {
        Alert.alert("Error", response.message || "Failed to create post.");
      }
    } catch (error) {
      console.error("Create post error:", error);
      Alert.alert("Error", "An error occurred while creating the post.");
    } finally {
      setIsPosting(false);
    }
  };

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need camera roll access to upload images."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets?.length > 0) {
      setSelectedImageUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        ListHeaderComponent={
          <CreatePostSection
            user={user}
            content={newPostContent}
            onContentChange={setNewPostContent}
            imageUri={selectedImageUri}
            onImagePick={handlePickImage}
            onClearImage={() => setSelectedImageUri(null)}
            onSubmit={handleCreatePost}
            isLoading={isPosting}
          />
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator
              style={styles.loadingContainer}
              color={colors.blue}
              size="large"
            />
          ) : (
            <Text style={styles.emptyText}>No posts yet</Text>
          )
        }
        onRefresh={fetchPosts}
        refreshing={isLoading}
      />
    </SafeAreaView>
  );
};

export default PostFeed;
