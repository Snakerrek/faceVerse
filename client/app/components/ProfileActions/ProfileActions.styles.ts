import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: spacing.medium,
    width: "100%",
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.blue,
    paddingVertical: 12,
    borderRadius: borderRadiuses.small,
    alignItems: "center",
    marginHorizontal: spacing.small / 2,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
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
    fontSize: 14,
    fontWeight: "600",
  },
});
