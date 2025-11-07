import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses } from "../../theme";

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
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadiuses.medium,
    borderTopRightRadius: borderRadiuses.medium,
    maxHeight: "80%",
    paddingBottom: spacing.large,
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
    fontSize: 20,
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
    fontSize: 16,
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
    fontSize: 14,
    color: colors.primaryText,
  },
  actorName: {
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
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
