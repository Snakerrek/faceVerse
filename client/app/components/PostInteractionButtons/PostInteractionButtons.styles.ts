import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
  },
  button: {
    marginRight: spacing.large,
  },
});
