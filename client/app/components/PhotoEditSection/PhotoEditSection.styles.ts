import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: spacing.large,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: spacing.medium,
  },
});
