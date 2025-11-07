import React from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useRegisterForm from "../../hooks/useRegisterForm";
import FormInput from "../../components/FormInput/FormInput";
import Message from "../../components/Message/Message";
import GenderSelector from "../../components/GenderSelector/GenderSelector";
import DateInput from "../../components/DateInput/DateInput";
import styles from "./RegisterScreen.styles";
import { useRouter } from "expo-router";

const RegisterScreen: React.FC = () => {
  const {
    formData,
    isLoading,
    message,
    isError,
    handleInputChange,
    handleRegister,
  } = useRegisterForm();

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
          <Text style={styles.title}>Create new account</Text>
          <Text style={styles.subtitle}>It's fast and easy</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputRow}>
            <View style={styles.inputWrapperHalf}>
              <FormInput
                label="First name"
                value={formData.first_name}
                onChangeText={(text) => handleInputChange("first_name", text)}
              />
            </View>
            <View style={styles.inputWrapperHalf}>
              <FormInput
                label="Last name"
                value={formData.last_name}
                onChangeText={(text) => handleInputChange("last_name", text)}
              />
            </View>
          </View>

          <DateInput
            day={formData.dob_day}
            month={formData.dob_month}
            year={formData.dob_year}
            onDayChange={(text) => handleInputChange("dob_day", text)}
            onMonthChange={(text) => handleInputChange("dob_month", text)}
            onYearChange={(text) => handleInputChange("dob_year", text)}
          />

          <GenderSelector
            selectedGender={formData.gender}
            onGenderChange={(gender) => handleInputChange("gender", gender)}
          />

          <FormInput
            label="E-mail"
            containerStyle={styles.inputWrapperFullWithMargin}
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormInput
            label="Password"
            containerStyle={styles.inputWrapperFullWithMargin}
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
            secureTextEntry
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
              title="Register"
              onPress={handleRegister}
              color={styles.button.color}
              disabled={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
