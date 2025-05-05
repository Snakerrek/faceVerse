import { Platform } from 'react-native';

// Read URLs from process.env provided by Expo
const webBaseUrl = process.env.EXPO_PUBLIC_API_URL_WEB;
const mobileBaseUrl = process.env.EXPO_PUBLIC_API_URL_MOBILE;

// Select the appropriate URL based on the platform
const selectedUrl = Platform.select({
  web: webBaseUrl,
  ios: mobileBaseUrl,
  android: mobileBaseUrl,
  default: mobileBaseUrl, // Fallback for other platforms
});

// Basic check if the selected URL is defined
if (!selectedUrl) {
  console.warn("API_BASE_URL could not be determined. Check .env variables (EXPO_PUBLIC_API_URL_WEB, EXPO_PUBLIC_API_URL_MOBILE) and platform.");
}

export const API_BASE_URL = selectedUrl || '';
