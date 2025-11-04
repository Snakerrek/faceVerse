import React from "react";
import { View, Text, Pressable } from "react-native";
import { Gender } from "../../types/types";
import { styles } from "./GenderSelector.styles";

interface GenderSelectorProps {
  selectedGender: Gender;
  onGenderChange: (gender: Gender) => void;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({
  selectedGender,
  onGenderChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gender</Text>
      <View style={styles.buttonRow}>
        <Pressable
          style={[
            styles.genderButton,
            selectedGender === Gender.FEMALE && styles.genderButtonSelected,
          ]}
          onPress={() => onGenderChange(Gender.FEMALE)}
        >
          <Text
            style={[
              styles.genderButtonText,
              selectedGender === Gender.FEMALE &&
                styles.genderButtonTextSelected,
            ]}
          >
            {Gender.FEMALE}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.genderButton,
            selectedGender === Gender.MALE && styles.genderButtonSelected,
          ]}
          onPress={() => onGenderChange(Gender.MALE)}
        >
          <Text
            style={[
              styles.genderButtonText,
              selectedGender === Gender.MALE && styles.genderButtonTextSelected,
            ]}
          >
            {Gender.MALE}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
