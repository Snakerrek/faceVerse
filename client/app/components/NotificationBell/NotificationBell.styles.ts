import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

export const styles = StyleSheet.create({
  bellContainer: {
    position: "relative",
    padding: spacing.small,
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: colors.danger,
    borderRadius: borderRadiuses.small,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xsmall,
  },
  badgeText: {
    color: colors.white,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.bold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: borderRadiuses.small,
    margin: spacing.medium,
    paddingVertical: spacing.medium,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalTitle: {
    fontSize: typography.fontSize.large,
    fontWeight: "bold",
    color: colors.primaryText,
  },
  loader: {
    marginVertical: spacing.medium,
  },
  emptyState: {
    padding: spacing.medium,
    alignItems: "center",
  },
  emptyText: {
    color: colors.secondaryText,
    fontSize: typography.fontSize.regular,
  },
  notificationItem: {
    flexDirection: "row",
    padding: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    alignItems: "center",
  },
  unreadItem: {
    backgroundColor: colors.background,
  },
  notificationContent: {
    flex: 1,
    marginLeft: spacing.medium,
  },
  notificationText: {
    fontSize: typography.fontSize.medium,
    color: colors.primaryText,
  },
  actorName: {
    fontWeight: typography.fontWeight.bold,
  },
  timestamp: {
    fontSize: typography.fontSize.small,
    color: colors.secondaryText,
    marginTop: spacing.small,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.blue,
    marginLeft: spacing.small,
  },
});
