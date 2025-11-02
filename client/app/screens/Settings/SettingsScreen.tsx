import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { SettingsScreenProps } from '../../types/navigation';
import styles from './SettingsScreen.styles';

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>
        <Text>This is the Settings Screen.</Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;