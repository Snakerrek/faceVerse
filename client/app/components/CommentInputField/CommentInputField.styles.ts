import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.medium,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadiuses.small,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    fontSize: typography.fontSize.medium,
    color: colors.primaryText,
  },
  sendButton: {
    marginLeft: spacing.medium,
    padding: spacing.small,
  },
});

export default styles;
