import { StyleSheet } from "react-native";
import { colors, borderRadiuses, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexBasis: "30%",
    margin: spacing.medium,
    alignItems: "center",
    padding: spacing.medium,
    minWidth: 250,
    minHeight: 200,
    borderRadius: borderRadiuses.small,
    overflow: "hidden",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: spacing.medium,
  },
  textContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.small,
    borderRadius: borderRadiuses.medium,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginTop: 8,
  },
  name: {
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryText,
    textAlign: "center",
  },
});
