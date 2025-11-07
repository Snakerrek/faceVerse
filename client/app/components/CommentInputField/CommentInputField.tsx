import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../theme";
import styles from "./CommentInputField.styles";

interface CommentInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const CommentInputField: React.FC<CommentInputFieldProps> = ({
  value,
  onChangeText,
  onSubmit,
  isLoading,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write a comment..."
        placeholderTextColor={colors.secondaryText}
        value={value}
        onChangeText={onChangeText}
        editable={!isLoading}
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.blue} />
        ) : (
          <MaterialCommunityIcons name="send" size={20} color={colors.blue} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CommentInputField;
