import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { UserData } from "../../types/types";
import { getUserData } from "../../utils/storageUtils";
import { useImagePicker } from "../../hooks/useImagePicker";
import { useImageUpload } from "../../hooks/useImageUpload";
import { PhotoEditSection } from "../../components/PhotoEditSection/PhotoEditSection";
import { styles } from "./SettingsScreen.styles";
import { useAuthCheck } from "@/app/hooks/useAuthCheck";

const SettingsScreen: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const { pickImage } = useImagePicker();
  const { isUploading, uploadImage } = useImageUpload();
  useAuthCheck(true);

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

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: User data not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>

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
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
