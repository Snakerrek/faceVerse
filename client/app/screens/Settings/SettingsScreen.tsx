import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { UserData } from "../../types/types";
import { getUserData, storeUserData } from "../../utils/storageUtils";
import useImagePicker from "../../hooks/useImagePicker";
import useImageUpload from "../../hooks/useImageUpload";
import PhotoEditSection from "../../components/PhotoEditSection/PhotoEditSection";
import styles from "./SettingsScreen.styles";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useLanguage } from "../../locales/LanguageContext";
import { updateUserProfile } from "../../services/userService";
import { ResponseStatus } from "../../types/enums";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { router } from "expo-router";

const SettingsScreen: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const { pickImage } = useImagePicker();
  const { isUploading, uploadImage } = useImageUpload();
  const [isSaving, setIsSaving] = useState(false);
  useAuthCheck(true);
  const { t } = useLanguage();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const userData = await getUserData();
    if (userData) {
      setUser(userData);
    }
  };

  const handlePhotoEdit = async (photoType: "avatar" | "cover") => {
    if (!user) return;

    const imageUri = await pickImage(photoType);
    if (!imageUri) return;

    await uploadImage(imageUri, photoType, setUser);
  };

  const handleProfileUpdate = async (profileData: any) => {
    if (!user) return;

    setIsSaving(true);
    const response = await updateUserProfile(user.id, profileData);

    if (response.status === ResponseStatus.OK && response.data) {
      setUser(response.data.user);
      await setUser(response.data.user);
      storeUserData(response.data.user);
      router.replace("/profile");
    }

    setIsSaving(false);
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {t("error")}: {t("userDataNotFound")}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t("settings")}</Text>

        <PhotoEditSection
          type="cover"
          user={user}
          isLoading={isUploading}
          onEditPress={() => handlePhotoEdit("cover")}
        />

        <PhotoEditSection
          type="avatar"
          user={user}
          isLoading={isUploading}
          onEditPress={() => handlePhotoEdit("avatar")}
        />

        <ProfileForm
          initialData={{
            bio: user.bio,
            relationship_status: user.relationship_status,
            education: user.education,
            school: user.school,
            city: user.city,
            occupation: user.occupation,
            workplace: user.workplace,
          }}
          onSave={handleProfileUpdate}
          isLoading={isSaving}
        />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
