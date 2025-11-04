import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses } from "../../theme";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    paddingVertical: spacing.medium - 6,
    paddingHorizontal: spacing.medium,
    borderRadius: borderRadiuses.small,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
