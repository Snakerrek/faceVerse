import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.medium,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  nameContainer: {
    marginLeft: spacing.medium,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.primaryText,
  },
  timestamp: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 2,
  },
  menuButton: {
    fontSize: 20,
    color: colors.secondaryText,
  },
});
