import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses } from "../../theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadiuses.small,
    marginVertical: spacing.small,
    marginHorizontal: spacing.small,
    elevation: 2,
  },
  // Modal overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  // Likers modal container
  likersModalContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadiuses.small,
    marginTop: spacing.small,
    width: "85%",
    maxHeight: "70%",
  },
  likersHeader: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
  },
  likersHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primaryText,
  },
  likersLoadingContainer: {
    padding: spacing.large,
    alignItems: "center",
  },
  likersEmptyContainer: {
    padding: spacing.large,
    alignItems: "center",
  },
  likersEmptyText: {
    color: colors.secondaryText,
  },
  likerItem: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    flexDirection: "row",
    alignItems: "center",
  },
  likerItemText: {
    fontSize: 16,
    color: colors.primaryText,
    fontWeight: "500",
    marginLeft: spacing.medium,
  },
  commentsLoadingContainer: {
    paddingVertical: 20,
  },
});
