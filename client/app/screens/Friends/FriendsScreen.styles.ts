import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.medium,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backButtonContainer: {
    paddingRight: spacing.medium,
  },
  backButton: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: "600",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primaryText,
  },
  count: {
    fontSize: 14,
    color: colors.secondaryText,
    marginTop: spacing.small,
  },
  listContent: {
    padding: spacing.small,
  },
  friendItem: {
    flexDirection: "row",
    padding: spacing.medium,
    backgroundColor: colors.white,
    borderRadius: borderRadiuses.medium,
    marginBottom: spacing.small,
    alignItems: "center",
  },
  friendInfo: {
    flex: 1,
    marginLeft: spacing.medium,
  },
  friendName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryText,
  },
  friendBio: {
    fontSize: 14,
    color: colors.secondaryText,
    marginTop: spacing.small,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.large,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: spacing.small,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: "center",
  },
});
