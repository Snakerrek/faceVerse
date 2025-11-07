import { StyleSheet } from "react-native";
import { borderRadiuses, colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
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
  content: {
    flex: 1,
    marginLeft: spacing.medium,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.small,
    marginLeft: spacing.small,
  },
  likeCount: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  author: {
    fontWeight: "bold",
    fontSize: 13,
    color: colors.primaryText,
  },
  text: {
    fontSize: 13,
    color: colors.primaryText,
    marginTop: spacing.small / 2,
    backgroundColor: colors.background,
    padding: spacing.small,
    borderRadius: borderRadiuses.small,
  },
  time: {
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: spacing.small / 2,
  },
});
