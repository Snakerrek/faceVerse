import { StyleSheet } from "react-native";
import { borderRadiuses, colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.medium,
    borderWidth: 1,
    borderColor: colors.borderLight,
    margin: spacing.small,
    borderRadius: borderRadiuses.small,
  },
  pressableArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
    marginLeft: spacing.medium,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.small,
    marginLeft: spacing.small,
  },
  likeCount: {
    fontSize: typography.fontSize.small,
    color: colors.secondaryText,
  },
  author: {
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.medium,
    color: colors.primaryText,
  },
  text: {
    fontSize: typography.fontSize.medium,
    color: colors.primaryText,
    marginTop: spacing.xsmall,
    backgroundColor: colors.background,
    padding: spacing.small,
    borderRadius: borderRadiuses.small,
  },
  time: {
    fontSize: typography.fontSize.small,
    color: colors.secondaryText,
    marginTop: spacing.xsmall,
  },
});
