import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

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
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primaryText,
    marginTop: spacing.medium,
  },
  postsSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primaryText,
    marginTop: spacing.large,
    marginBottom: spacing.small,
    alignSelf: "flex-start",
  },
});
