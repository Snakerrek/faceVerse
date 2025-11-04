import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
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
    fontSize: 16,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: spacing.small,
  },
});
