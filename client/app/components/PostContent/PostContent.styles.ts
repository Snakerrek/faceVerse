import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    borderWidth: 1,
    borderColor: colors.borderLight,
    margin: spacing.small,
    borderRadius: borderRadiuses.small,
  },
  text: {
    fontSize: 14,
    color: colors.primaryText,
    marginBottom: spacing.small,
    backgroundColor: colors.background,
    padding: spacing.small,
    borderRadius: borderRadiuses.small,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: borderRadiuses.small,
    borderColor: colors.borderLight,
    borderWidth: 1,
  },
});
