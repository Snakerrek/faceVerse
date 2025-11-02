import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { createPost, getPosts } from '../../backendService'; // Import your API functions
import { Post, ResponseStatus, UserData } from '../../types/types'; // Import your types
import styles from './HomeScreen.styles'; // We'll reuse the styles

// --- PostCard Component (Moved and Updated) ---
// It now accepts the 'Post' type from your API
const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  // Get the first letter for the avatar
  const authorInitial = post.author_name ? post.author_name[0] : '?';
  
  // Format the ISO timestamp string into a readable local date/time
  const postTimestamp = new Date(post.timestamp).toLocaleString();

  return (
    <View style={styles.postCard}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLetter}>{authorInitial}</Text>
        </View>
        <View style={styles.postHeaderText}>
          <Text style={styles.postUserName}>{post.author_name}</Text>
          <Text style={styles.postTimestamp}>{postTimestamp}</Text>
        </View>
      </View>

      {/* Post Content */}
      <Text style={styles.postContent}>{post.content}</Text>

      {/* Separator */}
      <View style={styles.postSeparator} />

      {/* Post Actions (still placeholders) */}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="thumbs-up-outline" size={20} color="#606770" />
          <Text style={styles.actionText}>Lubię to!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="comment-outline" size={20} color="#606770" />
          <Text style={styles.actionText}>Komentarz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="share-outline" size={20} color="#606770" />
          <Text style={styles.actionText}>Udostępnij</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- PostFeed Component ---
interface PostFeedProps {
  user: UserData; // Pass the logged-in user data
}

const PostFeed: React.FC<PostFeedProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(true); // For initial fetch
  const [isPosting, setIsPosting] = useState(false); // For creating a post

  const userInitial = user.first_name ? user.first_name[0] : '?';

  // --- 1. Fetch Posts ---
  const fetchPosts = async () => {
    setIsLoading(true);
    const response = await getPosts(); // Call your API function
    if (response.status === ResponseStatus.OK) {
      setPosts(response.data ?? []); // Set the posts from API
    } else {
      Alert.alert('Błąd', 'Nie udało się pobrać postów.');
    }
    setIsLoading(false);
  };

  // --- 2. Load posts on component mount ---
  useEffect(() => {
    fetchPosts();
  }, []);

  // --- 3. Handle Creating a Post ---
  const handleCreatePost = async () => {
    if (newPostContent.trim() === '') {
      return; // Don't post empty content
    }
    setIsPosting(true);
    const response = await createPost({ content: newPostContent });

    if (response.status === ResponseStatus.OK && response.data) {
      // Add the new post to the top of the list
      setPosts([(response.data as unknown) as Post, ...posts]);
      setNewPostContent(''); // Clear the input
    } else {
      Alert.alert('Błąd', 'Nie udało się dodać posta.');
    }
    setIsPosting(false);
  };

  return (
    // Use a FlatList which is the correct component for scrollable lists
    <FlatList
      style={styles.feed} // Use the feed style for the list container
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PostCard post={item} />}
      // Pull-to-refresh
      onRefresh={fetchPosts}
      refreshing={isLoading}
      // Header component includes the "Create Post" box
      ListHeaderComponent={
        <>
          {/* Create Post Section */}
          <View style={styles.createPostContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarLetter}>{userInitial}</Text>
            </View>
            <TextInput
              style={styles.postInput}
              placeholder={`O czym myślisz, ${user.first_name}?`}
              placeholderTextColor="#606770"
              value={newPostContent}
              onChangeText={setNewPostContent}
              multiline
            />
          </View>
          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitPostButton} // You'll need to add this style
            onPress={handleCreatePost}
            disabled={isPosting}>
            <Text style={styles.submitPostButtonText}>
              {isPosting ? 'Publikowanie...' : 'Opublikuj'}
            </Text>
          </TouchableOpacity>
        </>
      }
      // Show a loader while fetching
      ListEmptyComponent={() =>
        !isLoading ? (
          <Text style={styles.emptyFeedText}>Nie ma jeszcze żadnych postów.</Text>
        ) : null // Don't show this text during the initial load
      }
    />
  );
};

export default PostFeed;