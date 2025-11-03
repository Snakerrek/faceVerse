import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.iconBackground,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
});

export default styles;