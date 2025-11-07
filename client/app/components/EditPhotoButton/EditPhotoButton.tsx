import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import styles from "./EditPhotoButton.styles";

interface EditPhotoButtonProps {
  label: string;
  isLoading: boolean;
  onPress: () => void;
}

const EditPhotoButton: React.FC<EditPhotoButtonProps> = ({
  label,
  isLoading,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={styles.buttonText.color} />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default EditPhotoButton;
