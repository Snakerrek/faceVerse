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

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const authorInitial = post.author_name ? post.author_name[0] : '?';
  const postTimestamp = new Date(post.timestamp).toLocaleString();

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLetter}>{authorInitial}</Text>
        </View>
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