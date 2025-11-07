import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

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
    paddingBottom: 5,
  },
  backButton: {
    padding: spacing.small,
    alignSelf: "center",
  },
  backButtonText: {
    fontSize: 18,
    color: colors.blue,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContentContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: spacing.small,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.tertiaryText,
  },
  subtitle: {
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: "center",
    marginBottom: spacing.large + spacing.small,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: spacing.medium,
    columnGap: spacing.small,
  },
  inputWrapperHalf: {
    flex: 1,
  },
  inputWrapperFullWithMargin: {
    width: "100%",
    marginBottom: 20,
    marginTop: spacing.medium,
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
