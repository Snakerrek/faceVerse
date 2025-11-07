import { StyleSheet } from "react-native";
import { colors, typography } from "../../theme";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: colors.danger,
    fontSize: typography.fontSize.regular,
  },
  contentContainer: {
    flex: 1,
  },
});

export default styles;
