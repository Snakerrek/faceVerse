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
import { useLanguage } from "../../locales/LanguageContext";

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
  const { t } = useLanguage();
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={t("writeComment") + "..."}
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
