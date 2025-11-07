import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
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
  buttonContainer: {
    width: "80%",
    marginVertical: spacing.small,
  },
  button: {
    color: colors.blue,
  },
});
