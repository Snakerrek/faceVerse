import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LoginScreenProps } from '../../types/navigation';
import { ResponseStatus, Res, LoginData } from '../../types/types';
import { login } from '../../backendService';
import styles from './LoginScreen.styles';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const [isError, setIsError] = useState(false);

  const handleChange = (name: keyof typeof formData, value: string) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setMessage('Email and password are required.');
      setIsError(true);
      return;
    }
    setIsLoading(true);
    setMessage(undefined);
    setIsError(false);
    const loginRes: Res = await login(formData);
    if(loginRes.status === ResponseStatus.OK) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
    } else {
      setMessage(loginRes.message);
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBarContainer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"< Back"}</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContentContainer}>
            <Text style={styles.title}>Login</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapperFull}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email address"
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapperFullWithMargin}>
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                secureTextEntry
            />
          </View>

          {isLoading && <ActivityIndicator size="large" color="#1877f2" />}
          {message && (
            <Text style={isError ? styles.errorMessage : styles.successMessage}>
              {message}
            </Text>
          )}
          <View style={styles.buttonWrapper}>
            <Button
                title={isLoading ? 'Logging in...' : 'Login'}
                onPress={handleLogin}
                disabled={isLoading}
                color="#1877f2" // Consistent button color
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;