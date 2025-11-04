import React, { forwardRef } from "react";
import { View, Text, TextInput, TextInputProps, ViewStyle } from "react-native";
import { styles } from "./FormInput.styles";

interface FormInputProps extends TextInputProps {
  label: string;
  containerStyle?: ViewStyle;
}

export const FormInput = forwardRef<TextInput, FormInputProps>(
  ({ label, containerStyle, ...textInputProps }, ref) => {
    return (
      <View style={containerStyle || styles.inputWrapperFull}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          style={styles.input}
          placeholderTextColor={styles.placeholder.color}
          {...textInputProps}
        />
      </View>
    );
  }
);

FormInput.displayName = "FormInput";
