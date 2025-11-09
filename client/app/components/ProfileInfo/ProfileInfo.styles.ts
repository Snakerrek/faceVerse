import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: borderRadiuses.small,
    padding: spacing.medium,
    marginTop: spacing.medium,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.medium,
  },
  infoRowLast: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  infoIcon: {
    marginRight: spacing.medium,
    color: colors.blue,
  },
  infoText: {
    fontSize: typography.fontSize.regular,
    color: colors.primaryText,
  },
  expandButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.small,
    marginTop: spacing.small,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  expandText: {
    fontSize: typography.fontSize.regular,
    color: colors.blue,
    marginRight: spacing.xsmall,
    fontWeight: "600",
  },
});

export default styles;
