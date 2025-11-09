import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import PostCard from "../../components/PostCard/PostCard";
import { getPostById } from "../../services/postService";
import { Post } from "../../types/types";
import { ResponseStatus } from "../../types/enums";
import styles from "./PostScreen.styles";
import { colors } from "../../theme";
import { useLanguage } from "../../locales/LanguageContext";

const PostScreen: React.FC = () => {
  const params = useLocalSearchParams<{ postId: string }>();
  const postId = params.postId ? parseInt(params.postId, 10) : null;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      if (!postId) return;
      const response = await getPostById(postId);
      if (response.status === ResponseStatus.OK && response.data) {
        setPost(response.data);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.blue} />
      </SafeAreaView>
    );
  }

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{t("postNotFound")}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <PostCard post={post} expandedByDefault={true} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostScreen;
