import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

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
    marginRight: spacing.small,
  },
  likesButton: {
    flex: 1,
    paddingVertical: spacing.small,
    marginTop: spacing.xsmall,
  },
  text: {
    fontSize: typography.fontSize.small,
    color: colors.secondaryText,
  },
  heartButton: {
    paddingVertical: spacing.small,
    marginHorizontal: spacing.small,
  },
});
