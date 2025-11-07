import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuItemText: {
    marginLeft: spacing.medium,
    fontSize: typography.fontSize.regular,
    color: colors.primaryText,
  },
  dangerousText: {
    color: colors.danger,
  },
});

export default styles;
