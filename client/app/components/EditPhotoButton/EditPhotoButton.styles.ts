import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: borderRadiuses.small,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.regular,
  },
});
