import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.medium,
    alignItems: "center",
  },
  title: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.medium,
    color: colors.tertiaryText,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: typography.fontSize.regular,
    color: colors.danger,
  },
});

export default styles;
