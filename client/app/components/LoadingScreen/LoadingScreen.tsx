import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./LoadingScreen.styles";

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={styles.activityIndicator.color} />
    </View>
  );
};

export default LoadingScreen;
