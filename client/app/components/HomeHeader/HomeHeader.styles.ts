import { StyleSheet } from "react-native";
import { borderRadiuses, colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.medium,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  logoText: {
    fontSize: typography.fontSize.xlarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.blue,
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    backgroundColor: colors.iconBackground,
    borderRadius: borderRadiuses.medium,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: spacing.small,
  },
  icon: {
    color: colors.primaryText,
  },
  headerTitle: {
    fontSize: typography.fontSize.xlarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryText,
  },
});
