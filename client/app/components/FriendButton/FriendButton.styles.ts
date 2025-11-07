import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses } from "../../theme";

export const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: colors.blue,
    paddingVertical: 12,
    borderRadius: borderRadiuses.small,
    alignItems: "center",
    marginHorizontal: spacing.small / 2,
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
    fontSize: 16,
    fontWeight: "bold",
  },
});
