import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { RegisterScreenProps } from '../../types/navigation';
import { Gender, RegisterData, RegisterFormData, Res, ResponseStatus } from '../../types/types';
import { register } from '../../backendService';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './RegisterScreen.styles';

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    gender: Gender.MALE
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (name: keyof typeof formData, value: string) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
      setMessage('All fields are required.');
      setIsError(true);
      return;
    }
    // --- VALIDATE AND FORMAT DATE OF BIRTH ---
    let date_of_birth_payload: string = '';
    if (formData.dob_year && formData.dob_month && formData.dob_day) {
      // Basic validation for date parts (more thorough validation recommended)
      const year = parseInt(formData.dob_year, 10);
      const month = parseInt(formData.dob_month, 10);
      const day = parseInt(formData.dob_day, 10);

      if (isNaN(year) || isNaN(month) || isNaN(day) ||
          month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > new Date().getFullYear()) {
        setMessage('Invalid date of birth.');
        setIsError(true);
        return;
      }
      // Format to YYYY-MM-DD
      date_of_birth_payload = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    } else if (formData.dob_year || formData.dob_month || formData.dob_day) {
      // If any part is filled, all should be
      setMessage('Please fill all parts of the date of birth or leave it empty.');
      setIsError(true);
      return;
    }
    setIsLoading(true);
    setMessage(null);
    setIsError(false);
    const registerRQ: RegisterData = {
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      date_of_birth: date_of_birth_payload,
      gender: formData.gender
    }
    const registerRes: Res = await register(registerRQ);
    if(registerRes.status === ResponseStatus.OK){
      setMessage('Registration successful! Please login.');
      setIsError(false);
      setFormData({
        email: '', password: '', first_name: '', last_name: '',
        dob_day: '', dob_month: '', dob_year: '', gender: Gender.MALE
      });
      // Navigate to Login screen after successful registration
      console.log('Registration successful, navigating to Login.');
      navigation.navigate('Login');
    } else {
      console.error('Registration Error:', registerRes.message);
      setMessage(registerRes.message || 'An error occurred. Please try again.');
      setIsError(true);
    }
    setIsLoading(false);
  }

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
          <Text style={styles.title}>Utwórz nowe konto</Text>
          <Text style={styles.subtitle}>To szybkie i proste.</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputRow}>
            <View style={styles.inputWrapperHalf}>
              <Text style={styles.label}>Imię</Text>
              <TextInput
                style={styles.input}
                placeholder="Imię"
                value={formData.first_name}
                onChangeText={(text) => handleChange('first_name', text)}
              />
            </View>
            <View style={styles.inputWrapperHalf}>
              <Text style={styles.label}>Nazwisko</Text>
              <TextInput
                style={styles.input}
                placeholder="Nazwisko"
                value={formData.last_name}
                onChangeText={(text) => handleChange('last_name', text)}
              />
            </View>
          </View>

          <Text style={styles.label}>Data urodzenia</Text>
          <View style={styles.inputRow}>
            <View style={styles.inputWrapperThird}>
              <TextInput
                style={styles.input}
                placeholder="DD"
                value={formData.dob_day}
                onChangeText={(text) => handleChange('dob_day', text)}
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>
            <View style={styles.inputWrapperThird}>
              <TextInput
                style={styles.input}
                placeholder="MM"
                value={formData.dob_month}
                onChangeText={(text) => handleChange('dob_month', text)}
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>
            <View style={styles.inputWrapperThird}>
              <TextInput
                style={styles.input}
                placeholder="YYYY"
                value={formData.dob_year}
                onChangeText={(text) => handleChange('dob_year', text)}
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>
          </View>

          <Text style={styles.label}>Płeć</Text>
          <View style={styles.inputRow}>
            <Pressable
              style={[
                styles.genderButton,
                formData.gender === Gender.FEMALE && styles.genderButtonSelected,
              ]}
              onPress={() => handleChange('gender', Gender.FEMALE)}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  formData.gender === Gender.FEMALE && styles.genderButtonTextSelected,
                ]}
              >
                {Gender.FEMALE}
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.genderButton,
                formData.gender === Gender.MALE && styles.genderButtonSelected,
              ]}
              onPress={() => handleChange('gender', Gender.MALE)}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  formData.gender === Gender.MALE && styles.genderButtonTextSelected,
                ]}
              >
                {Gender.MALE}
              </Text>
            </Pressable>
          </View>

          <View style={styles.inputWrapperFull}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Adres e-mail"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapperFullWithMargin}>
            <Text style={styles.label}>Hasło</Text>
            <TextInput
              style={styles.input}
              placeholder="Hasło"
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
              title={isLoading ? 'Rejestrowanie...' : 'Zarejestruj się'}
              onPress={handleRegister}
              disabled={isLoading}
              color="#1877f2"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;