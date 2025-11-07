import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 60,
    paddingRight: spacing.small,
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadiuses.small,
    overflow: "hidden",
    minWidth: 150,
  },
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
