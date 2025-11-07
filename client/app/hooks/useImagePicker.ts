import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

type PickerType = "avatar" | "cover";

interface ImagePickerOptions {
  aspect: [number, number];
  quality: number;
}

const PICKER_OPTIONS: Record<PickerType, ImagePickerOptions> = {
  avatar: {
    aspect: [1, 1],
    quality: 0.8,
  },
  cover: {
    aspect: [3, 1],
    quality: 0.8,
  },
};

const useImagePicker = () => {
  const requestPermissions = async (): Promise<boolean> => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need camera roll access to upload images."
      );
      return false;
    }

    return true;
  };

  const pickImage = async (pickerType: PickerType) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      ...PICKER_OPTIONS[pickerType],
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    return result.assets[0].uri;
  };

  return { pickImage };
};

export default useImagePicker;
