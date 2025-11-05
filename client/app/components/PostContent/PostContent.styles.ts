import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.medium,
    paddingBottom: spacing.medium,
  },
  text: {
    fontSize: 14,
    color: colors.primaryText,
    marginBottom: spacing.small,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: borderRadiuses.small,
  },
});
