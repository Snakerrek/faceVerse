import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: spacing.medium,
  },
  label: {
    fontSize: 12,
    color: colors.secondaryText,
    marginBottom: 4,
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
    paddingVertical: spacing.medium - 4,
    alignItems: "center",
    backgroundColor: colors.inputBackground,
  },
  genderButtonSelected: {
    borderColor: colors.blue,
    borderWidth: 1.5,
  },
  genderButtonText: {
    fontSize: 15,
    color: colors.tertiaryText,
  },
  genderButtonTextSelected: {
    color: colors.blue,
    fontWeight: "600",
  },
});
