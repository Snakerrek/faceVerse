import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
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
