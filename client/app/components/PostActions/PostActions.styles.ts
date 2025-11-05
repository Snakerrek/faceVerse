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
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    color: colors.secondaryText,
  },
});
