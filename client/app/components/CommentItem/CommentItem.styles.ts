import { StyleSheet } from "react-native";
import { borderRadiuses, colors, spacing, typography } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
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
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.small,
  },
  content: {
    flex: 1,
    marginLeft: spacing.medium,
  },
  likeCount: {
    fontSize: typography.fontSize.small,
    color: colors.secondaryText,
    marginBottom: spacing.xsmall,
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default styles;
