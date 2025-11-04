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
    paddingHorizontal: spacing.medium - 4,
    borderRadius: borderRadiuses.small,
    backgroundColor: colors.inputBackground,
    fontSize: 15,
    color: colors.primaryText,
  },
  placeholder: {
    color: colors.secondaryText,
  },
});
