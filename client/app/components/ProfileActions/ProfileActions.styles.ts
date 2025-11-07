import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: spacing.medium,
    width: "100%",
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.blue,
    paddingVertical: spacing.medium,
    borderRadius: borderRadiuses.small,
    alignItems: "center",
    marginHorizontal: spacing.xsmall,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.bold,
  },
  friendsButton: {
    backgroundColor: colors.background,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: borderRadiuses.medium,
    alignItems: "center",
    marginTop: spacing.small,
  },
  friendsButtonText: {
    color: colors.primaryText,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold,
  },
});

export default styles;
