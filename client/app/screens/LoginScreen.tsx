import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LoginScreenProps } from '../types/navigation';
import { ResponseStatus, Res, LoginData } from '../types/types';
import { login } from '../backendService';

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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
  backButton: {
    padding: 10,
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#1877f2',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  headerContentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 12,
    color: '#606770',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  inputWrapperFull: {
    width: '100%',
    marginBottom: 15,
  },
  inputWrapperFullWithMargin: {
    width: '100%',
    marginBottom: 25,
  },
  input: {
    height: 50,
    borderColor: '#ccd0d5',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#f5f6f7',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  successMessage: {
    color: 'green',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: 10,
    width: '100%',
  }
});

export default LoginScreen;
