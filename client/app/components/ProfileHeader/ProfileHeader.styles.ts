import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  profileContent: {
    alignItems: "center",
    paddingBottom: spacing.medium,
    marginTop: -60,
    paddingHorizontal: spacing.medium,
  },
  avatarContainer: {
    marginTop: -60,
  },
  name: {
    fontSize: typography.fontSize.xlarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryText,
    marginTop: spacing.medium,
  },
  postsSectionTitle: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryText,
    marginTop: spacing.large,
    marginBottom: spacing.small,
    alignSelf: "flex-start",
  },
});
