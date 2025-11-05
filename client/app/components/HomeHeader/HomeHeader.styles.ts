import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.blue,
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    backgroundColor: colors.iconBackground,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  icon: {
    color: colors.primaryText,
  },
});
