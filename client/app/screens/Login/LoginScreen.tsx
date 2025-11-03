import React, { useState, useRef } from 'react'; // 👈 Import useRef
import {
  View,
  Text,
  TextInput, // 👈 Import TextInput type
  Button,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ResponseStatus, Res, LoginData } from '../../types/types'; // Adjust path if needed
import { login } from '../../backendService'; // Adjust path if needed
import styles from './LoginScreen.styles'; // Adjust path if needed

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const passwordInputRef = useRef<TextInput>(null);

  const handleChange = (name: keyof typeof formData, value: string) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setMessage('E-mail and password are required.');
      setIsError(true);
      return;
    }
    setIsLoading(true);
    setMessage(undefined);
    setIsError(false);
    const loginRes: Res<null> = await login(formData);
    if(loginRes.status === ResponseStatus.OK) {
        router.replace('/home');
    } else {
      setMessage(loginRes.message);
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBarContainer}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
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
            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail address"
                placeholderTextColor={styles.placeholder.color}
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
          </View>

          <View style={styles.inputWrapperFullWithMargin}>
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={styles.placeholder.color}
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                secureTextEntry
                ref={passwordInputRef}
                returnKeyType="go"
                onSubmitEditing={handleLogin}
            />
          </View>

          {isLoading && <ActivityIndicator size="large" color={styles.activityIndicator.color} />}
          
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
                color={styles.button.color}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;