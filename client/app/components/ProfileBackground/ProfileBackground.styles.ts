import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const ProfileBackgroundStyles = StyleSheet.create({
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
    borderRadius: 8,
    marginBottom: 15,
  },

  searchCard: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export type BackgroundContext = "profile" | "settings" | "searchCard";
