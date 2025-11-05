import { StyleSheet } from "react-native";
import { borderRadiuses, colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: spacing.medium,
    borderWidth: 1,
    borderColor: colors.borderLight,
    margin: spacing.small,
    borderRadius: borderRadiuses.small,
  },
  content: {
    flex: 1,
    marginLeft: spacing.medium,
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
  likeCount: {
    fontSize: 11,
    color: colors.blue,
    fontWeight: "500",
    marginTop: spacing.small,
  },
  likeButton: {
    padding: spacing.small,
  },
});
