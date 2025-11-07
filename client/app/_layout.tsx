import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./theme";
import { LanguageProvider } from "./locales/LanguageContext";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <RootLayoutContent />
    </LanguageProvider>
  );
}

function RootLayoutContent() {
  const router = useRouter();

  const handleSmartBack = () => {
    if (router.canGoBack?.()) {
      router.back();
    } else {
      router.replace("/home");
    }
  };

  return (
    <Stack
      screenOptions={{
        headerBackVisible: false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={handleSmartBack}
            style={{ paddingLeft: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.blue} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="friends" options={{ title: "Friends" }} />
      <Stack.Screen name="post" options={{ title: "Post" }} />
    </Stack>
  );
}
