import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Post } from '../../types/types';
import styles from './HomeScreen.styles';
import UserAvatar from '../../components/UserAvatar';
import { useRouter } from 'expo-router';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const postTimestamp = new Date(post.timestamp).toLocaleString();
  const router = useRouter();

  const handleProfilePress = () => {
    router.push({
      pathname: "/profile",
      params: { userId: post.user_id },
    });
  };

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <TouchableOpacity 
        style={styles.postHeader}
        onPress={handleProfilePress}>
          <UserAvatar 
            avatarUrl={post.author_avatar_url} 
            size='small' 
          />
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

      <View style={styles.postSeparator} />

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons
            name="thumbs-up-outline"
            size={20}
            style={styles.iconSecondary}
          />
          <Text style={styles.actionText}>Lubię to!</Text>
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
    </View>
  );
};

export default PostCard;