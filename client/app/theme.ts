import { TextStyle } from "react-native";

export const colors = {
  blue: "#1877f2",
  background: "#f0f6f6",
  white: "#ffffff",
  black: "#000",
  primaryText: "#050505",
  secondaryText: "#606770",
  tertiaryText: "#1c1e21",
  iconBackground: "#e4e6eb",
  borderLight: "#dddfe2",
  borderMedium: "#ccd0d5",
  inputBackground: "#f5f6f7",
  danger: "red",
  success: "green",
};

export const spacing = {
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 48,
};

export const borderRadiuses = {
  medium: 25,
  small: 12,
};

export const typography = {
  fontSize: {
    small: 12,
    medium: 14,
    regular: 16,
    large: 18,
    xlarge: 28,
  },
  fontWeight: {
    regular: "400" as TextStyle["fontWeight"],
    bold: "600" as TextStyle["fontWeight"],
  },
};

// typography.fontWeight.regular
// typography.fontWeight.bold

// typography.fontSize.medium 14
// typography.fontSize.regular 16
// typography.fontSize.large 18
