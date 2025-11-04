import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const UserAvatarStyles = StyleSheet.create({
  base: {
    resizeMode: "cover",
    backgroundColor: colors.iconBackground,
  },
  small: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  medium: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  large: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: colors.white,
  },
  postContainerMargin: {
    marginRight: 10,
  },
  settingsContainerMargin: {
    marginBottom: 15,
  },
});
export type AvatarSize = "small" | "medium" | "large";
