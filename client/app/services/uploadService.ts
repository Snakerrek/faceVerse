import { API_BASE_URL } from "../config";
import { UserData, ResponseStatus, Res } from "../types/types";
import { getAuthToken } from "../utils/authUtils";

async function uploadFile(
  endpoint: string,
  formData: FormData
): Promise<Res<UserData>> {
  try {
    const token = await getAuthToken();
    if (!token) {
      return {
        status: ResponseStatus.ERROR,
        message: "No authentication token found.",
      };
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      return { status: ResponseStatus.OK, data: result as UserData };
    }

    return {
      status: ResponseStatus.ERROR,
      message: result.error || `Upload failed (Status: ${response.status})`,
    };
  } catch (error) {
    console.error(`${endpoint} Error:`, error);
    const message =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return { status: ResponseStatus.ERROR, message };
  }
}

export async function uploadAvatar(formData: FormData): Promise<Res<UserData>> {
  return uploadFile("/uploads/avatar", formData);
}

export async function uploadCover(formData: FormData): Promise<Res<UserData>> {
  return uploadFile("/uploads/cover", formData);
}
