import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { RegisterScreenProps } from '../../types/navigation';
import { Gender, RegisterData, RegisterFormData, Res, ResponseStatus } from '../../types/types';
import { register } from '../../backendService';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './RegisterScreen.styles';
import { useRouter } from 'expo-router';

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
  const router = useRouter();

  const handleChange = (name: keyof typeof formData, value: string) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
      setMessage('All the fields are required.');
      setIsError(true);
      return;
    }

    let date_of_birth_payload: string = '';
    if (formData.dob_year && formData.dob_month && formData.dob_day) {

      const year = parseInt(formData.dob_year, 10);
      const month = parseInt(formData.dob_month, 10);
      const day = parseInt(formData.dob_day, 10);

      if (isNaN(year) || isNaN(month) || isNaN(day) ||
          month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > new Date().getFullYear()) {
        setMessage('Wrong birthdate');
        setIsError(true);
        return;
      }

      date_of_birth_payload = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    } else if (formData.dob_year || formData.dob_month || formData.dob_day) {
      setMessage('Fill is all the date parts.');
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
    const registerRes: Res<null> = await register(registerRQ);
    if(registerRes.status === ResponseStatus.OK){
      setMessage('Registration went correct, you can log in now.');
      setIsError(false);
      setFormData({
        email: '', password: '', first_name: '', last_name: '',
        dob_day: '', dob_month: '', dob_year: '', gender: Gender.MALE
      });

      console.log('Registration successful, navigating to Login.');
      router.replace('/login');
    } else {
      console.error('Registration Error:', registerRes.message);
      setMessage(registerRes.message || 'Error, try again.');
      setIsError(true);
    }
    setIsLoading(false);
  }

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
          <Text style={styles.title}>Create new account</Text>
          <Text style={styles.subtitle}>It's fast and easy</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputRow}>
            <View style={styles.inputWrapperHalf}>
              <Text style={styles.label}>First name</Text>
              <TextInput
                style={styles.input}
                placeholder="First name"
                placeholderTextColor={styles.placeholder.color}
                value={formData.first_name}
                onChangeText={(text) => handleChange('first_name', text)}
              />
            </View>
            <View style={styles.inputWrapperHalf}>
              <Text style={styles.label}>Last name</Text>
              <TextInput
                style={styles.input}
                placeholder="Last name"
                placeholderTextColor={styles.placeholder.color}
                value={formData.last_name}
                onChangeText={(text) => handleChange('last_name', text)}
              />
            </View>
          </View>

          <Text style={styles.label}>Birth date</Text>
          <View style={styles.inputRow}>
            <View style={styles.inputWrapperThird}>
              <TextInput
                style={styles.input}
                placeholder="DD"
                placeholderTextColor={styles.placeholder.color}
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
                placeholderTextColor={styles.placeholder.color}
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
                placeholderTextColor={styles.placeholder.color}
                value={formData.dob_year}
                onChangeText={(text) => handleChange('dob_year', text)}
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>
          </View>

          <Text style={styles.label}>Gender</Text>
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
              placeholder="E-mail"
              placeholderTextColor={styles.placeholder.color}
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
              placeholderTextColor={styles.placeholder.color}
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
              secureTextEntry
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
              title={isLoading ? 'Registering...' : 'Register'}
              onPress={handleRegister}
              disabled={isLoading}
              color={styles.button.color}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;