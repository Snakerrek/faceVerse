import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: spacing.medium,
  },
  label: {
    fontSize: typography.fontSize.small,
    color: colors.secondaryText,
    marginBottom: spacing.xsmall,
  },
  inputRow: {
    flexDirection: "row",
    columnGap: spacing.small,
  },
  inputWrapperThird: {
    flex: 1,
  },
  input: {
    height: 45,
    borderColor: colors.borderMedium,
    borderWidth: 1,
    paddingHorizontal: spacing.medium,
    borderRadius: borderRadiuses.small,
    backgroundColor: colors.inputBackground,
    fontSize: typography.fontSize.regular,
    color: colors.primaryText,
  },
  placeholder: {
    color: colors.secondaryText,
  },
});

export default styles;
