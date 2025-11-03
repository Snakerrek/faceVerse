import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView,
  Image,
  Alert,
  Platform,
  TouchableOpacity
} from 'react-native';
import styles from './SettingsScreen.styles';
import * as ImagePicker from 'expo-image-picker';
import { getUserData, storeUserData } from '../../utils/storageUtils';
import { UserData, ResponseStatus } from '../../types/types';
import { uploadAvatar, uploadCover } from '../../backendService';
import { colors } from '../../theme'; 
import UserAvatar from '../../components/UserAvatar';
import ProfileBackground from '../../components/ProfileBackground';

const prepareFormData = async (uri: string, filename: string, key: 'avatar' | 'cover') => {
    const formData = new FormData();

    if (Platform.OS === 'web') {
        const response = await fetch(uri);
        const blob = await response.blob();
        formData.append(key, blob, filename);
    } else {
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formData.append(key, {
            uri: uri,
            name: filename,
            type: `image/${fileType}`,
        } as any);
    }
    return formData;
};

const SettingsScreen: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
      }
    };
    loadData();
  }, []);

  const handleUpload = async (pickerOptions: ImagePicker.ImagePickerOptions, endpoint: 'avatar' | 'cover') => {
    if (!user) return;
    
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
        Alert.alert("Permission Denied", `We need camera roll access to upload ${endpoint}.`);
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync(pickerOptions);

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return;
    }

    const localUri = result.assets[0].uri;
    const filename = localUri.split('/').pop() || `${endpoint}.jpg`;
    
    const formData = await prepareFormData(localUri, filename, endpoint);
    
    setIsUploading(true);
    const apiFunction = endpoint === 'avatar' ? uploadAvatar : uploadCover;
    const response = await apiFunction(formData);
    setIsUploading(false);

    if (response.status === ResponseStatus.OK && response.data) {
      Alert.alert("Success", `${endpoint} updated!`);
      setUser(response.data);
      await storeUserData(response.data);
    } else {
      Alert.alert("Error", response.message || `Failed to upload ${endpoint}.`);
    }
  };

  const handlePickAndUploadAvatar = () => {
    handleUpload({ allowsEditing: true, aspect: [1, 1], quality: 0.8, mediaTypes: ImagePicker.MediaTypeOptions.Images }, 'avatar');
  };

  const handlePickAndUploadCover = () => {
    handleUpload({ allowsEditing: true, aspect: [3, 1], quality: 0.8, mediaTypes: ImagePicker.MediaTypeOptions.Images }, 'cover');
  };
  
  if (!user) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.content}>Error: User data not found.</Text>
        </SafeAreaView>
    );
  }

  const backgroundUrl = user?.cover_url;

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.coverSection}>
            <Text style={styles.label}>Cover Photo</Text>
            <ProfileBackground backgroundUrl={backgroundUrl} context='settings' />
            <TouchableOpacity 
                onPress={handlePickAndUploadCover}
                style={[styles.button, {backgroundColor: colors.blue}]}
                disabled={isUploading}
            >
                <Text style={styles.buttonText}>{isUploading ? 'Uploading Cover...' : 'Change Cover Photo'}</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.avatarSection}>
            <Text style={styles.label}>Profile Picture</Text>
            <UserAvatar 
                avatarUrl={user?.avatar_url} 
                size='medium'
            />
            <TouchableOpacity
                onPress={handlePickAndUploadAvatar}
                style={[styles.button, {backgroundColor: colors.blue}]}
                disabled={isUploading}
            >
                <Text style={styles.buttonText}>{isUploading ? 'Uploading Photo...' : 'Change Profile Picture'}</Text>
            </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;