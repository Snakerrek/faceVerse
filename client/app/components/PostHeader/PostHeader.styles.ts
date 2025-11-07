import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.medium,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  nameContainer: {
    marginLeft: spacing.medium,
  },
  name: {
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.regular,
    color: colors.primaryText,
  },
  timestamp: {
    fontSize: typography.fontSize.small,
    color: colors.secondaryText,
    marginTop: 2,
  },
  menuButton: {
    fontSize: typography.fontSize.large,
    color: colors.secondaryText,
  },
});
