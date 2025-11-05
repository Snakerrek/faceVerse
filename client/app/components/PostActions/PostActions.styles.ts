import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    padding: spacing.small,
  },
  button: {
    flex: 1,
    paddingVertical: spacing.small,
    marginTop: 2,
    alignItems: "flex-end",
    marginRight: 8,
  },
  likesButton: {
    flex: 1,
    paddingVertical: spacing.small,
    marginTop: 2,
  },
  text: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  heartButton: {
    paddingVertical: spacing.small,
    marginHorizontal: 8,
  },
});
