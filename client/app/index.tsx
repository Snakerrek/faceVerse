import { SafeAreaView, StyleSheet } from 'react-native';
import RegisterScreen from './RegisterScreen'; // Import the screen

export default function Index() {
  return (
    // SafeAreaView helps avoid notches and status bars
    <SafeAreaView style={styles.container}>
      <RegisterScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make sure it fills the screen
  },
});
