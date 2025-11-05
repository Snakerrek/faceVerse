import React from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useLoginForm } from "./useLoginForm";
import { FormInput } from "../../components/FormInput/FormInput";
import { Message } from "../../components/Message/Message";
import { styles } from "./LoginScreen.styles";

const LoginScreen: React.FC = () => {
  const {
    formData,
    isLoading,
    message,
    isError,
    passwordInputRef,
    handleInputChange,
    handleLogin,
    focusPasswordInput,
  } = useLoginForm();

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBarContainer}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"< Back"}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContentContainer}>
          <Text style={styles.title}>Login</Text>
        </View>

        <View style={styles.formContainer}>
          <FormInput
            label="E-mail"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={focusPasswordInput}
          />

          <FormInput
            label="Password"
            containerStyle={styles.inputWrapperFullWithMargin}
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
            secureTextEntry
            ref={passwordInputRef}
            returnKeyType="go"
            onSubmitEditing={handleLogin}
          />

          {isLoading && (
            <ActivityIndicator
              size="large"
              color={styles.activityIndicator.color}
            />
          )}

          {message && <Message text={message} isError={isError} />}

          <View style={styles.buttonWrapper}>
            <Button
              title="Login"
              onPress={handleLogin}
              color={styles.button.color}
              disabled={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
