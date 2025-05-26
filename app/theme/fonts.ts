/** @format */

import { Platform } from "react-native";

const fonts = {
  regular: Platform.select({
    ios: "Poppins-Regular",
    android: "Poppins-Regular"
  }),
  medium: Platform.select({
    ios: "Poppins-Medium",
    android: "Poppins-Medium"
  }),
  semiBold: Platform.select({
    ios: "Poppins-SemiBold",
    android: "Poppins-SemiBold"
  }),
  bold: Platform.select({
    ios: "Poppins-Bold",
    android: "Poppins-Bold"
  })
};

const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36
};

const lineHeights = {
  xs: 16,
  sm: 20,
  base: 24,
  lg: 28,
  xl: 32,
  "2xl": 36,
  "3xl": 40,
  "4xl": 48
};

const theme = {
  fonts,
  fontSizes,
  lineHeights
};

export { fonts, fontSizes, lineHeights };
export default theme;
