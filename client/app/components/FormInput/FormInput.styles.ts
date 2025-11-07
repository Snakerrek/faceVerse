import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

const styles = StyleSheet.create({
  inputWrapperFull: {
    width: "100%",
    marginBottom: spacing.medium,
  },
  label: {
    fontSize: typography.fontSize.small,
    color: colors.secondaryText,
    marginBottom: spacing.xsmall,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: colors.borderLight,
    borderWidth: 1,
    borderRadius: borderRadiuses.small,
    paddingHorizontal: spacing.medium,
    fontSize: typography.fontSize.regular,
    backgroundColor: colors.inputBackground,
    color: colors.primaryText,
  },
  placeholder: {
    color: colors.secondaryText,
  },
});

export default styles;
