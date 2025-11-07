import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme";

interface SmartBackHeaderProps {
  title: string;
}

export const SmartBackHeader: React.FC<SmartBackHeaderProps> = ({ title }) => {
  const router = useRouter();
  const navigation = useNavigation();

  const handleSmartBack = () => {
    if (router.canGoBack?.()) {
      router.back();
    } else {
      router.replace("/home");
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleSmartBack} style={{ paddingLeft: 16 }}>
          <Ionicons name="arrow-back" size={24} color={colors.blue} />
        </TouchableOpacity>
      ),
      headerTitle: title,
    });
  }, [navigation]);

  return null; // This component only sets header options
};
