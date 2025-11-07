import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserData } from "../../types/types";
import UserAvatar from "../UserAvatar/UserAvatar";
import { colors } from "../../theme";
import styles from "./CreatePostSection.styles";

interface CreatePostSectionProps {
  user: UserData;
  content: string;
  onContentChange: (text: string) => void;
  imageUri: string | null;
  onImagePick: () => void;
  onClearImage: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const CreatePostSection: React.FC<CreatePostSectionProps> = ({
  user,
  content,
  onContentChange,
  imageUri,
  onImagePick,
  onClearImage,
  onSubmit,
  isLoading,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UserAvatar avatarUrl={user.avatar_url} size="small" />
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor={colors.secondaryText}
          value={content}
          onChangeText={onContentChange}
          editable={!isLoading}
          multiline
        />
      </View>

      {imageUri && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          <TouchableOpacity
            style={styles.removeImageButton}
            onPress={onClearImage}
          >
            <MaterialCommunityIcons
              name="close"
              size={20}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onImagePick}
          disabled={isLoading}
        >
          <MaterialCommunityIcons
            name="image-plus"
            size={20}
            color={colors.blue}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.postButton, isLoading && styles.postButtonDisabled]}
          onPress={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Text style={styles.postButtonText}>Post</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePostSection;
