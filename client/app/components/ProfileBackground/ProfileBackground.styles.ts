import { StyleSheet } from "react-native";
import { borderRadiuses, colors, spacing } from "../../theme";

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: colors.borderLight,
    width: "100%",
  },

  baseImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  profile: {
    height: 150,
  },

  settings: {
    height: 120,
    borderRadius: borderRadiuses.small,
    marginBottom: spacing.medium,
  },

  searchCard: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    borderTopLeftRadius: borderRadiuses.small,
    borderTopRightRadius: borderRadiuses.small,
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export type BackgroundContext = "profile" | "settings" | "searchCard";
export default styles;
