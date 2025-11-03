import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image
} from 'react-native';
import UserAvatar from '../../components/UserAvatar';
import { createPost, getPosts } from '../../backendService';
import { CreatePostData, Post, ResponseStatus, UserData } from '../../types/types';
import styles from './HomeScreen.styles';
import { colors } from '../../theme';
import PostCard from './PostCard';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PostFeedProps {
  user: UserData;
}

const PostFeed: React.FC<PostFeedProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert("Permission Denied", "We need camera roll access to upload an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImageUri(result.assets[0].uri);
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    const response = await getPosts();
    if (response.status === ResponseStatus.OK) {
      setPosts(response.data ?? [])
    } else {
      Alert.alert('Error', 'Posts couldn\'t be fetched');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

const handleCreatePost = async () => {
    if (newPostContent.trim() === '' && !selectedImageUri) {
      return;
    }
    setIsPosting(true);

    const postData: CreatePostData = {
      content: newPostContent,
      localImageUri: selectedImageUri
    };

    const response = await createPost(postData);

    if (response.status === ResponseStatus.OK && response.data) {
      setPosts([response.data, ...posts]);
      setNewPostContent('');
      setSelectedImageUri(null);
    } else {
      Alert.alert('Błąd', response.message || 'Nie udało się dodać posta.');
    }
    setIsPosting(false);
  };

  return (
    <FlatList
      style={styles.feed}
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PostCard post={item} />}
      onRefresh={fetchPosts}
      refreshing={isLoading}
      ListHeaderComponent={
        <>
          <View style={styles.createPostContainer}>
            <UserAvatar 
              avatarUrl={user.avatar_url} 
              size='small'
            />
            <TextInput
              style={styles.postInput}
              placeholder={`What are you thinking about, ${user.first_name}?`}
              placeholderTextColor={colors.secondaryText}
              value={newPostContent}
              onChangeText={setNewPostContent}
              multiline
            />
          </View>
          {selectedImageUri && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: selectedImageUri }} style={styles.imagePreview} />
              <TouchableOpacity 
                style={styles.imageClearButton}
                onPress={() => setSelectedImageUri(null)}
              >
                 <MaterialCommunityIcons name="close-circle" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity 
                style={styles.actionButton}
                onPress={handlePickImage}
            >
                <MaterialCommunityIcons name="image" size={24} color="green" />
                <Text style={styles.actionText}>Zdjęcie</Text>
            </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitPostButton}
            onPress={handleCreatePost}
            disabled={isPosting}>
            <Text style={styles.submitPostButtonText}>
              {isPosting ? 'Posting...' : 'Post'}
            </Text>
          </TouchableOpacity>
        </>
      }
      ListEmptyComponent={() =>
        !isLoading ? (
          <Text style={styles.emptyFeedText}>There are no posts yet.</Text>
        ) : null
      }
    />
  );
};

export default PostFeed;