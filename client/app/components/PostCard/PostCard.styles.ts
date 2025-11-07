import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.small,
    marginVertical: spacing.small,
    marginHorizontal: spacing.small,
    elevation: 2,
  },
  commentsLoadingContainer: {
    paddingVertical: spacing.medium,
  },
});
