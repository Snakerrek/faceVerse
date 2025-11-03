import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Post } from '../../types/types';
import styles from './HomeScreen.styles';
import UserAvatar from '../../components/UserAvatar';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const postTimestamp = new Date(post.timestamp).toLocaleString();


  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <UserAvatar 
          avatarUrl={post.author_avatar_url} 
          size='small' 
        />
        <View style={styles.postHeaderText}>
          <Text style={styles.postUserName}>{post.author_name}</Text>
          <Text style={styles.postTimestamp}>{postTimestamp}</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

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