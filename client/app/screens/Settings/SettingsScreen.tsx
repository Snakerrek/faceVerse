import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  Button, 
  Image,
  Alert,
  ActivityIndicator,
  Platform
} from 'react-native';
import styles from './SettingsScreen.styles';
import * as ImagePicker from 'expo-image-picker';
import { getUserData, storeUserData } from '../../utils/storageUtils';
import { UserData, ResponseStatus } from '../../types/types';
import { uploadAvatar } from '../../backendService';
import { colors } from '../../theme';
import { useRouter } from 'expo-router';

const SettingsScreen: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
      }
    };
    loadData();
  }, []);

  const handlePickAndUploadImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert("Permission Denied", "We need camera roll access to upload an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return;
    }

    const localUri = result.assets[0].uri;
    const filename = localUri.split('/').pop();
    const formData = new FormData();

    if (Platform.OS === 'web') {
      const response = await fetch(localUri);
      const blob = await response.blob();
      formData.append('avatar', blob, filename);
    } else {
      const uriParts = localUri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('avatar', {
        uri: localUri,
        name: filename,
        type: `image/${fileType}`,
      } as any);
    }

    setIsLoading(true);
    const response = await uploadAvatar(formData);
    setIsLoading(false);

    if (response.status === ResponseStatus.OK && response.data) {
      Alert.alert("Success", "Profile picture updated!");
      setUser(response.data);
      await storeUserData(response.data);
    } else {
      Alert.alert("Error", response.message || "Failed to upload image.");
    }
  };

  const avatarSource = user?.avatar_url
    ? { uri: user.avatar_url }
    : require('../../../assets/default-avatar.png');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        <Image
          style={styles.avatar}
          source={avatarSource}
        />

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.blue} />
        ) : (
          <Button
            title="Change Profile Picture"
            onPress={handlePickAndUploadImage}
            color={colors.blue}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;