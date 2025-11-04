import React from "react";
import { Text } from "react-native";
import { styles } from "./Message.styles";

interface MessageProps {
  text: string;
  isError: boolean;
}

export const Message: React.FC<MessageProps> = ({ text, isError }) => {
  return (
    <Text style={isError ? styles.errorMessage : styles.successMessage}>
      {text}
    </Text>
  );
};
