import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { ProfileScreenProps } from '../../types/navigation';
import styles from './ProfileScreen.styles';

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Profile</Text>
        <Text>This is the Profile Screen.</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;