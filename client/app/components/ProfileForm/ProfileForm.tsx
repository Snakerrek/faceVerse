import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLanguage } from "../../locales/LanguageContext";
import styles from "./ProfileForm.styles";
import { RelationshipStatus, Education } from "../../types/enums";

interface ProfileFormProps {
  initialData: {
    bio?: string;
    relationship_status?: string;
    education?: string;
    school?: string;
    city?: string;
    occupation?: string;
    workplace?: string;
  };
  onSave: (data: any) => void;
  isLoading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  onSave,
  isLoading,
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(initialData);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getEnumValues = (enumObj: any) => {
    return Object.values(enumObj) as string[];
  };

  return (
    <View style={styles.formWrapper}>
      <View style={styles.section}>
        <Text style={styles.label}>{t("bio")}</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={formData.bio || ""}
          onChangeText={(text) => handleChange("bio", text)}
          placeholder={t("bioPlaceholder")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{t("relationshipStatus")}</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.relationship_status || ""}
            onValueChange={(value) =>
              handleChange("relationship_status", value)
            }
            style={styles.picker}
          >
            <Picker.Item label={t("selectOption")} value="" />
            {getEnumValues(RelationshipStatus).map((value) => (
              <Picker.Item key={value} label={t(value)} value={value} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{t("education")}</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.education || ""}
            onValueChange={(value) => handleChange("education", value)}
            style={styles.picker}
          >
            <Picker.Item label={t("selectOption")} value="" />
            {getEnumValues(Education).map((value) => (
              <Picker.Item key={value} label={t(value)} value={value} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{t("school")}</Text>
        <TextInput
          style={styles.input}
          value={formData.school || ""}
          onChangeText={(text) => handleChange("school", text)}
          placeholder={t("schoolPlaceholder")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{t("city")}</Text>
        <TextInput
          style={styles.input}
          value={formData.city || ""}
          onChangeText={(text) => handleChange("city", text)}
          placeholder={t("cityPlaceholder")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{t("occupation")}</Text>
        <TextInput
          style={styles.input}
          value={formData.occupation || ""}
          onChangeText={(text) => handleChange("occupation", text)}
          placeholder={t("occupationPlaceholder")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{t("workplace")}</Text>
        <TextInput
          style={styles.input}
          value={formData.workplace || ""}
          onChangeText={(text) => handleChange("workplace", text)}
          placeholder={t("workplacePlaceholder")}
        />
      </View>

      <TouchableOpacity
        style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
        onPress={() => onSave(formData)}
        disabled={isLoading}
      >
        <Text style={styles.saveButtonText}>{t("save")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileForm;
