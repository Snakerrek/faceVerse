import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: borderRadiuses.medium,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadiuses.small,
    width: "80%",
    padding: spacing.medium,
  },
  modalTitle: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.medium,
    color: colors.primaryText,
  },
  languageItem: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  languageText: {
    fontSize: typography.fontSize.regular,
    color: colors.primaryText,
  },
});

export default styles;
