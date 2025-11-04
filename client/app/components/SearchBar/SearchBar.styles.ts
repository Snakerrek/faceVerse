import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  input: {
    height: 40,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: spacing.medium,
    fontSize: 16,
    color: colors.primaryText,
  },
  placeholder: {
    color: colors.secondaryText,
  },
});
