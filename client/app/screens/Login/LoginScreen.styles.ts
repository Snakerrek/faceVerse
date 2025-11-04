import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topBarContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
  backButton: {
    padding: 10,
    alignSelf: "center",
  },
  backButtonText: {
    fontSize: 18,
    color: colors.blue,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 20,
  },
  headerContentContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 30,
  },
  inputWrapperFullWithMargin: {
    width: "100%",
    marginBottom: 25,
  },
  activityIndicator: {
    color: colors.blue,
  },
  buttonWrapper: {
    marginTop: 10,
  },
  button: {
    color: colors.blue,
  },
});
