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
import { createPost, getPosts } from '../../backendService';
import { Post, ResponseStatus, UserData } from '../../types/types';
import styles from './HomeScreen.styles';
import { colors } from '../../theme';
import PostCard from './PostCard';
const defaultAvatar = require('../../../assets/default-avatar.png');

interface PostFeedProps {
  user: UserData;
}

const PostFeed: React.FC<PostFeedProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);

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
    if (newPostContent.trim() === '') {
      return;
    }
    setIsPosting(true);
    const response = await createPost({ content: newPostContent });

    if (response.status === ResponseStatus.OK && response.data) {
      setPosts([(response.data as unknown) as Post, ...posts]);
      setNewPostContent('');
    } else {
      Alert.alert('Błąd', 'Nie udało się dodać posta.');
    }
    setIsPosting(false);
  };

  const userAvatarSource = user.avatar_url
    ? { uri: user.avatar_url }
    : defaultAvatar;

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
            <Image source={userAvatarSource} style={styles.avatar} />
            <TextInput
              style={styles.postInput}
              placeholder={`What are you thinking about, ${user.first_name}?`}
              placeholderTextColor={colors.secondaryText}
              value={newPostContent}
              onChangeText={setNewPostContent}
              multiline
            />
          </View>
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