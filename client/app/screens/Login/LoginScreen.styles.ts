import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
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
    color: colors.blue,
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
    color: colors.secondaryText,
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
    borderColor: colors.borderLight,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: colors.inputBackground,
    fontSize: 16,
  },
  errorMessage: {
    color: colors.danger,
    marginBottom: 15,
    textAlign: 'center',
  },
  successMessage: {
    color: colors.success,
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: 10,
    width: '100%',
  },

  activityIndicator: {
    color: colors.blue,
  },
  button: {
    color: colors.blue,
  },
  placeholder: {
    color: colors.secondaryText,
  },
});

export default styles;