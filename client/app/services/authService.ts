import { API_BASE_URL } from "../config";
import { LoginResponse, LoginData, Res, RegisterData } from "../types/types";
import { ResponseStatus } from "../types/enums";
import { saveAuthToken } from "../utils/authUtils";
import { storeUserData } from "../utils/storageUtils";

async function handleAuthRequest<T>(
  endpoint: string,
  data: LoginData | RegisterData,
  onSuccess?: (result: any) => Promise<void>
): Promise<Res<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      if (onSuccess) {
        await onSuccess(result);
      }
      return { status: ResponseStatus.OK };
    }

    return {
      status: ResponseStatus.ERROR,
      message: result.error || `Request failed (Status: ${response.status})`,
    };
  } catch (error) {
    console.error(`${endpoint} Error:`, error);
    return {
      status: ResponseStatus.ERROR,
      message: "An error occurred. Please try again.",
    };
  }
}

export async function login(data: LoginData): Promise<Res<void>> {
  return handleAuthRequest<void>(
    "/auth/login",
    data,
    async (result: LoginResponse) => {
      if (result.access_token) {
        await saveAuthToken(result.access_token);
        await storeUserData(result.user);
      }
    }
  );
}

export async function register(data: RegisterData): Promise<Res<void>> {
  return handleAuthRequest<void>("/auth/register", data);
}
