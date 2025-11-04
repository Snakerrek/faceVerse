import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loader: {
    marginTop: spacing.large,
  },
  list: {
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    marginTop: spacing.large,
    fontSize: 16,
    color: colors.secondaryText,
  },
  errorText: {
    textAlign: "center",
    marginTop: spacing.large,
    fontSize: 16,
    color: colors.danger,
  },
});
