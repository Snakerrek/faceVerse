import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import useAuthCheck from "../../hooks/useAuthCheck";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import styles from "./WelcomeScreen.styles";
import { useRouter } from "expo-router";

const WelcomeScreen: React.FC = () => {
  const router = useRouter();
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
      <Text style={styles.header}>FaceVerse</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToRegister}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
