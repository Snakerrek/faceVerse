import { StyleSheet } from "react-native";
import { borderRadiuses, colors, spacing, typography } from "../../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  input: {
    height: borderRadiuses.medium,
    backgroundColor: colors.background,
    borderRadius: borderRadiuses.medium,
    paddingHorizontal: spacing.medium,
    fontSize: typography.fontSize.regular,
    color: colors.primaryText,
  },
  placeholder: {
    color: colors.secondaryText,
  },
});

export default styles;
