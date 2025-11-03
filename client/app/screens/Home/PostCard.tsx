import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Post } from '../../types/types';
import styles from './HomeScreen.styles';
const defaultAvatar = require('../../../assets/default_avatar.jpg');

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const postTimestamp = new Date(post.timestamp).toLocaleString();
  
  const authorAvatarSource = post.author_avatar_url
    ? { uri: post.author_avatar_url }
    : defaultAvatar;

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={authorAvatarSource} style={styles.avatar} />
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