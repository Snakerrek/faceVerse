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
  buttonRow: {
    flexDirection: "row",
    columnGap: spacing.small,
  },
  genderButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    borderRadius: borderRadiuses.small,
    paddingVertical: spacing.small,
    alignItems: "center",
    backgroundColor: colors.inputBackground,
  },
  genderButtonSelected: {
    borderColor: colors.blue,
    borderWidth: 1.5,
  },
  genderButtonText: {
    fontSize: typography.fontSize.regular,
    color: colors.tertiaryText,
  },
  genderButtonTextSelected: {
    color: colors.blue,
    fontWeight: typography.fontWeight.bold,
  },
});

export default styles;
