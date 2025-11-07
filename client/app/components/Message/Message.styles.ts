import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

const styles = StyleSheet.create({
  errorMessage: {
    color: colors.danger,
    textAlign: "center",
    marginVertical: spacing.small,
    fontSize: typography.fontSize.medium,
  },
  successMessage: {
    color: colors.success,
    textAlign: "center",
    marginVertical: spacing.small,
    fontSize: typography.fontSize.medium,
  },
});

export default styles;
