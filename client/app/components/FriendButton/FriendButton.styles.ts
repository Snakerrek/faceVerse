import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: colors.blue,
    paddingVertical: spacing.medium,
    borderRadius: borderRadiuses.small,
    alignItems: "center",
    marginHorizontal: spacing.xsmall,
  },
  addButton: {
    backgroundColor: colors.blue,
  },
  invitedButton: {
    backgroundColor: colors.blue,
  },
  acceptButton: {
    backgroundColor: colors.success,
  },
  friendsButton: {
    backgroundColor: colors.primaryText,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.bold,
  },
});

export default styles;
