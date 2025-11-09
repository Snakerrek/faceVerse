import { StyleSheet } from "react-native";
import { colors, spacing, typography, borderRadiuses } from "../../theme";

const styles = StyleSheet.create({
  formWrapper: {
    padding: spacing.medium,
    marginVertical: spacing.small,
    width: "100%",
  },
  section: {
    marginBottom: spacing.large,
  },
  label: {
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryText,
    marginBottom: spacing.small,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadiuses.small,
    padding: spacing.medium,
    fontSize: typography.fontSize.medium,
    backgroundColor: colors.inputBackground,
    color: colors.primaryText,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadiuses.small,
    padding: spacing.medium,
    fontSize: typography.fontSize.medium,
    backgroundColor: colors.inputBackground,
    minHeight: 100,
    textAlignVertical: "top",
    color: colors.primaryText,
  },
  pickerContainer: {
    justifyContent: "center",
    minHeight: 50,
  },
  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: spacing.small,
    color: colors.primaryText,
    borderColor: colors.borderLight,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadiuses.small,
  },
  saveButton: {
    backgroundColor: colors.blue,
    padding: spacing.large,
    borderRadius: borderRadiuses.small,
    alignItems: "center",
    marginTop: spacing.medium,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold,
  },
});

export default styles;
