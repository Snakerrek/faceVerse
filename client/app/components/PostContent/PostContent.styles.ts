import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses, typography } from "../../theme";

const styles = StyleSheet.create({
  container: {
    margin: spacing.small,
    borderRadius: borderRadiuses.small,
  },
  text: {
    fontSize: typography.fontSize.medium,
    color: colors.primaryText,
    marginBottom: spacing.small,
    padding: spacing.small,
    borderRadius: borderRadiuses.small,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: borderRadiuses.small,
    borderColor: colors.borderLight,
    borderWidth: 1,
  },
});

export default styles;
