import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyText: {
    textAlign: "center",
    marginTop: spacing.large,
    fontSize: typography.fontSize.regular,
    color: colors.secondaryText,
  },
  loadingContainer: {
    marginTop: spacing.large,
  },
});

export default styles;
