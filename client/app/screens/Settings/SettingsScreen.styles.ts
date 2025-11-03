import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  coverSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: 10,
  },
  cover: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.iconBackground,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default styles;