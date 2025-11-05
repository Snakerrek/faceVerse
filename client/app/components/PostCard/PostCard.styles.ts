import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses } from "../../theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadiuses.small,
    marginVertical: spacing.small,
    marginHorizontal: spacing.small,
    elevation: 2,
  },
});
