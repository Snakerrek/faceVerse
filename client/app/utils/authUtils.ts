import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_KEY, API_BASE_URL } from "../config";
import { Res } from "../types/types";
import { ResponseStatus } from "../types/enums";

class StorageAdapter {
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }

  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return AsyncStorage.getItem(key);
    } else {
      return SecureStore.getItemAsync(key);
    }
  }

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }
}

const storage = new StorageAdapter();

export async function saveAuthToken(token: string): Promise<void> {
  await storage.setItem(AUTH_TOKEN_KEY, token);
}

export async function getAuthToken(): Promise<string | null> {
  return storage.getItem(AUTH_TOKEN_KEY);
}

export async function deleteAuthToken(): Promise<void> {
  await storage.removeItem(AUTH_TOKEN_KEY);
}

function createErrorResponse<T>(message: string): Res<T> {
  return { status: ResponseStatus.ERROR, message };
}

function createSuccessResponse<T>(data: T): Res<T> {
  return { status: ResponseStatus.OK, data };
}

function extractErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "An unknown error occurred.";
}

export async function authRequest<T>(
  endpoint: string,
  options: RequestInit,
  dataExtractor: (json: any) => T = (json) => json as T
): Promise<Res<T>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      return createErrorResponse("No authentication token found.");
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    const result = await response.json();

    if (response.ok) {
      return createSuccessResponse(dataExtractor(result));
    }

    const errorMessage =
      result.error || `Request failed (Status: ${response.status})`;
    return createErrorResponse(errorMessage);
  } catch (error) {
    console.error("API Request Error:", error);
    return createErrorResponse(extractErrorMessage(error));
  }
}

export async function getLoggedInUserID(): Promise<number | null> {
  try {
    const token = await getAuthToken();
    if (!token) return null;

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const payload = JSON.parse(jsonPayload);
    return parseInt(payload.sub);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
