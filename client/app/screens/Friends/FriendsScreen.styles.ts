import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

const styles = StyleSheet.create({
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
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.bold,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryText,
  },
  count: {
    fontSize: typography.fontSize.medium,
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
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryText,
  },
  friendBio: {
    fontSize: typography.fontSize.medium,
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
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryText,
    marginBottom: spacing.small,
  },
  emptySubtext: {
    fontSize: typography.fontSize.medium,
    color: colors.secondaryText,
    textAlign: "center",
  },
});

export default styles;
