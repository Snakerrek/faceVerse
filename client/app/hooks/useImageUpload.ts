import { useState } from "react";
import { Alert, Platform } from "react-native";
import { UserData } from "../types/types";
import { ResponseStatus } from "../types/enums";
import { uploadAvatar, uploadCover } from "../services/uploadService";
import { storeUserData } from "../utils/storageUtils";

type UploadType = "avatar" | "cover";

const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const prepareFormData = async (
    uri: string,
    filename: string,
    key: UploadType
  ): Promise<FormData> => {
    const formData = new FormData();

    if (Platform.OS === "web") {
      const response = await fetch(uri);
      const blob = await response.blob();
      formData.append(key, blob, filename);
    } else {
      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formData.append(key, {
        uri,
        name: filename,
        type: `image/${fileType}`,
      } as any);
    }

    return formData;
  };

  const uploadImage = async (
    uri: string,
    uploadType: UploadType,
    onSuccess: (userData: UserData) => void
  ): Promise<void> => {
    try {
      setIsUploading(true);

      const filename = uri.split("/").pop() || `${uploadType}.jpg`;
      const formData = await prepareFormData(uri, filename, uploadType);

      const uploadFunction =
        uploadType === "avatar" ? uploadAvatar : uploadCover;
      const response = await uploadFunction(formData);

      if (response.status === ResponseStatus.OK && response.data) {
        Alert.alert("Success", `${uploadType} updated!`);
        await storeUserData(response.data);
        onSuccess(response.data);
      } else {
        Alert.alert(
          "Error",
          response.message || `Failed to upload ${uploadType}.`
        );
      }
    } catch (error) {
      console.error(`Upload error for ${uploadType}:`, error);
      Alert.alert("Error", `Failed to upload ${uploadType}. Please try again.`);
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, uploadImage };
};

export default useImageUpload;
