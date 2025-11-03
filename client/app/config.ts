import { Platform } from 'react-native';

const webBaseUrl = process.env.EXPO_PUBLIC_API_URL_WEB;
const mobileBaseUrl = process.env.EXPO_PUBLIC_API_URL_MOBILE;

const selectedUrl = Platform.select({
  web: webBaseUrl,
  ios: mobileBaseUrl,
  android: mobileBaseUrl,
  default: mobileBaseUrl,
});

if (!selectedUrl) {
  console.warn("API_BASE_URL could not be determined. Check .env variables (EXPO_PUBLIC_API_URL_WEB, EXPO_PUBLIC_API_URL_MOBILE) and platform.");
}

export const USER_DATA_KEY = 'userData';
export const AUTH_TOKEN_KEY = 'authToken';
export const API_BASE_URL = selectedUrl || '';
