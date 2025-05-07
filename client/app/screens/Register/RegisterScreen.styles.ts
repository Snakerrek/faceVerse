import { StyleSheet } from 'react-native';

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
    paddingBottom: 20,
  },
  headerContentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#606770',
    textAlign: 'center',
    marginBottom: 25,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 12,
    color: '#606770',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
    columnGap: 10,
  },
  inputWrapperHalf: {
    flex: 1,
  },
  inputWrapperThird: {
    flex: 1,
    maxWidth: '31%',
  },
  inputWrapperFull: {
    width: '100%',
    marginBottom: 0,
  },
  inputWrapperFullWithMargin: {
    width: '100%',
    marginBottom: 20,
    marginTop: 15,
  },
  input: {
    height: 45,
    borderColor: '#ccd0d5',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#f5f6f7',
    fontSize: 15,
  },
  genderButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccd0d5',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f5f6f7',
  },
  genderButtonSelected: {
    borderColor: '#1877f2',
    borderWidth: 1.5,
  },
  genderButtonText: {
    fontSize: 15,
    color: '#1c1e21',
  },
  genderButtonTextSelected: {
    color: '#1877f2',
    fontWeight: '600',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  successMessage: {
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: 10,
    width: '100%',
  }
});

export default styles;