import React from "react";
import { useLanguage } from "../../locales/LanguageContext";
import { View, Text, TouchableOpacity } from "react-native";
import useAuthCheck from "../../hooks/useAuthCheck";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import styles from "./WelcomeScreen.styles";
import { useRouter } from "expo-router";
import { LanguageSelector } from "@/app/components/LanguageSelector/LanguageSelector";

const WelcomeScreen: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const navigateToHome = () => {
    router.push("/home");
  };
  const { isLoading, navigateToLogin, navigateToRegister } = useAuthCheck(
    false,
    navigateToHome
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", top: 20, right: 20 }}>
        <LanguageSelector />
      </View>
      <Text style={styles.header}>FaceVerse</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>{t("logIn")}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToRegister}>
          <Text style={styles.buttonText}>{t("register")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
