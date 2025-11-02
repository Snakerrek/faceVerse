import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN_KEY, API_BASE_URL } from '../config';
import { ResponseStatus, Res } from "../types/types";

export async function saveAuthToken(token: string) {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
  }
}

export async function getAuthToken(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } else {
    return SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  }
}

export async function deleteAuthToken() {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  }
}

export async function authRequest<T>(
    endpoint: string, 
    options: RequestInit,
    dataExtractor: (json: any) => T = (json) => json as T
): Promise<Res<T>> {
    try {
        const token = await getAuthToken();
        if (!token) {
            return { status: ResponseStatus.ERROR, message: 'No authentication token found.' };
        }
        const allOptions: RequestInit = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers,
            },
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, allOptions);
        const result = await response.json();

        if (response.ok) {
            return { status: ResponseStatus.OK, data: dataExtractor(result) };
        } else {
            return { status: ResponseStatus.ERROR, message: result.error || `Request failed (Status: ${response.status})` };
        }
    } catch (error) {
        console.error('API Request Error:', error);
        const message = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { status: ResponseStatus.ERROR, message };
    }
}