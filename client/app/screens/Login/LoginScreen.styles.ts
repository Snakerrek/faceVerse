import { StyleSheet } from "react-native";
import { colors, spacing, typography, borderRadiuses } from "../../theme";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topBarContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: spacing.small,
    paddingTop: spacing.small,
    paddingBottom: spacing.xsmall,
  },
  backButton: {
    padding: spacing.small,
    alignSelf: "center",
  },
  backButtonText: {
    fontSize: typography.fontSize.large,
    color: colors.blue,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: spacing.medium,
  },
  headerContentContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: spacing.medium,
    marginTop: spacing.large,
    marginBottom: spacing.large,
  },
  title: {
    fontSize: typography.fontSize.xlarge,
    fontWeight: typography.fontWeight.bold,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: spacing.large,
  },
  inputWrapperFullWithMargin: {
    width: "100%",
    marginBottom: spacing.large,
  },
  activityIndicator: {
    color: colors.blue,
  },
  button: {
    backgroundColor: colors.blue,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: borderRadiuses.small,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  buttonDisabled: {
    backgroundColor: colors.secondaryText,
    opacity: 0.6,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold,
  },
  buttonWrapper: {
    width: "100%",
    marginVertical: spacing.small,
  },
});

export default styles;
