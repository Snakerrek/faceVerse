import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.medium,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadiuses.small,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    fontSize: 14,
    color: colors.primaryText,
  },
  sendButton: {
    marginLeft: spacing.medium,
    padding: spacing.small,
  },
});
