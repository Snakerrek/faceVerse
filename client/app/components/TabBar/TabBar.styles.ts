import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderBottomWidth: 2,
    borderBottomColor: colors.borderLight,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.medium,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabButtonActive: {
    borderBottomColor: colors.blue,
  },
});

export default styles;
