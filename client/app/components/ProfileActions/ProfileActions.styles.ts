import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: spacing.medium,
    width: "100%",
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.blue,
    paddingVertical: 12,
    borderRadius: borderRadiuses.small,
    alignItems: "center",
    marginHorizontal: spacing.small / 2,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
