import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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

export default styles;