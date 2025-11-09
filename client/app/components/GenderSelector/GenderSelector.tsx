import React from "react";
import { View, Text, Pressable } from "react-native";
import { Gender } from "../../types/enums";
import styles from "./GenderSelector.styles";
import { useLanguage } from "../../locales/LanguageContext";

interface GenderSelectorProps {
  selectedGender: Gender;
  onGenderChange: (gender: Gender) => void;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({
  selectedGender,
  onGenderChange,
}) => {
  const { t } = useLanguage();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t("gender")}</Text>
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
            {t(Gender.FEMALE)}
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
            {t(Gender.MALE)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GenderSelector;
