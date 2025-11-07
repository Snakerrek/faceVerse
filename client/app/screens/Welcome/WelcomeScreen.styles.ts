import { StyleSheet } from "react-native";
import { borderRadiuses, colors, spacing, typography } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.large,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: typography.fontSize.xlarge,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xlarge,
    color: colors.primaryText,
  },
  button: {
    backgroundColor: colors.blue,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: borderRadiuses.small,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold,
  },
  buttonContainer: {
    width: "100%",
    marginVertical: spacing.small,
  },
});

export default styles;
