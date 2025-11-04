import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses } from "../../theme";

export const styles = StyleSheet.create({
  inputWrapperFull: {
    width: "100%",
    marginBottom: spacing.medium,
  },
  label: {
    fontSize: 12,
    color: colors.secondaryText,
    marginBottom: 4,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: colors.borderLight,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing.medium,
    fontSize: 16,
    backgroundColor: colors.inputBackground,
    color: colors.primaryText,
  },
  placeholder: {
    color: colors.secondaryText,
  },
});
