import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useRegisterForm from "../../hooks/useRegisterForm";
import FormInput from "../../components/FormInput/FormInput";
import Message from "../../components/Message/Message";
import GenderSelector from "../../components/GenderSelector/GenderSelector";
import DateInput from "../../components/DateInput/DateInput";
import styles from "./RegisterScreen.styles";
import { colors } from "../../theme";
import { useLanguage } from "../../locales/LanguageContext";

const RegisterScreen: React.FC = () => {
  const {
    formData,
    isLoading,
    message,
    isError,
    handleInputChange,
    handleRegister,
  } = useRegisterForm();

  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContentContainer}>
          <Text style={styles.title}>{t("createAccount")}</Text>
          <Text style={styles.subtitle}>{t("fastAndEasy")}</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputRow}>
            <View style={styles.inputWrapperHalf}>
              <FormInput
                label={t("firstName")}
                value={formData.first_name}
                onChangeText={(text) => handleInputChange("first_name", text)}
              />
            </View>
            <View style={styles.inputWrapperHalf}>
              <FormInput
                label={t("lastName")}
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
            label={t("email")}
            containerStyle={styles.inputWrapperFullWithMargin}
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormInput
            label={t("password")}
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
            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <Text style={styles.buttonText}>{t("register")}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
