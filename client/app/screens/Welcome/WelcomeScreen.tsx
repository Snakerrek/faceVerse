import React from "react";
import { View, Text, Button } from "react-native";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import { LoadingScreen } from "../../components/LoadingScreen/LoadingScreen";
import { styles } from "./WelcomeScreen.styles";

const WelcomeScreen: React.FC = () => {
  const { isLoading, navigateToLogin, navigateToRegister } = useAuthCheck();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FaceVerse</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={navigateToLogin}
          color={styles.button.color}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Sign up"
          onPress={navigateToRegister}
          color={styles.button.color}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;
