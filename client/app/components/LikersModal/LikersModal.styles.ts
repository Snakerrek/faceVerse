import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadiuses.small,
    width: "85%",
    maxHeight: "70%",
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
  },
  headerText: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryText,
  },
  loadingContainer: {
    padding: spacing.large,
    alignItems: "center",
  },
  emptyContainer: {
    padding: spacing.large,
    alignItems: "center",
  },
  emptyText: {
    color: colors.secondaryText,
  },
  likerItem: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    flexDirection: "row",
    alignItems: "center",
  },
  likerItemText: {
    fontSize: typography.fontSize.regular,
    color: colors.primaryText,
    fontWeight: typography.fontWeight.bold,
    marginLeft: spacing.medium,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
});

export default styles;
