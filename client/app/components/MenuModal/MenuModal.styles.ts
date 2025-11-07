import { StyleSheet } from "react-native";
import { colors, spacing, borderRadiuses } from "../../theme";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 60,
    paddingRight: spacing.small,
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadiuses.small,
    overflow: "hidden",
    minWidth: 150,
  },
});

export default styles;
