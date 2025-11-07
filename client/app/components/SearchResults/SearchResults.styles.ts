import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    color: colors.blue,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: spacing.medium,
    color: colors.secondaryText,
    fontSize: typography.fontSize.regular,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: spacing.small,
  },
});

export default styles;
