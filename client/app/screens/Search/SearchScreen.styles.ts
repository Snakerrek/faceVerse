import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    marginTop: spacing.medium,
    color: colors.danger,
    fontSize: typography.fontSize.regular,
  },
});

export default styles;
