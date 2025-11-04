import { API_BASE_URL } from "./config";
import {
  LoginResponse,
  UserData,
  LoginData,
  ResponseStatus,
  Res,
  RegisterData,
  CreatePostData,
  Post,
  LikeResponse,
} from "./types/types";
import { saveAuthToken, authRequest, getAuthToken } from "./utils/authUtils";
import { storeUserData } from "./utils/storageUtils";
import { Platform } from "react-native";

export async function login(data: LoginData): Promise<Res<null>> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result: LoginResponse = await response.json();

    if (response.ok && result.access_token) {
      await saveAuthToken(result.access_token);
      console.log("Access token stored securely!");

      const userData: UserData = result.user;
      await storeUserData(userData);
      console.log("Login successful");
      return { status: ResponseStatus.OK };
    } else {
      return {
        status: ResponseStatus.ERROR,
        message: result.error || `Login failed (Status: ${response.status})`,
      };
    }
  } catch (error) {
    console.error("Login Error:", error);
    return {
      status: ResponseStatus.ERROR,
      message: "An error occurred during login. Please try again.",
    };
  }
}

export async function register(data: RegisterData): Promise<Res<null>> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.ok) {
      return { status: ResponseStatus.OK };
    } else {
      return {
        status: ResponseStatus.ERROR,
        message:
          result.error || `Registration failed (Status: ${response.status})`,
      };
    }
  } catch (error) {
    console.error("Registration Error:", error);
    return {
      status: ResponseStatus.ERROR,
      message: "An error occurred during registration. Please try again.",
    };
  }
}

const preparePostFormData = async (content: string, localImageUri: string) => {
  const formData = new FormData();
  formData.append("content", content);

  const filename = localImageUri.split("/").pop() || "post_image.jpg";

  if (Platform.OS === "web") {
    const response = await fetch(localImageUri);
    const blob = await response.blob();
    formData.append("image", blob, filename);
  } else {
    const uriParts = localImageUri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    formData.append("image", {
      uri: localImageUri,
      name: filename,
      type: `image/${fileType}`,
    } as any);
  }
  return formData;
};

export async function createPost(data: CreatePostData): Promise<Res<Post>> {
  const { content, localImageUri } = data;

  const endpoint = "/posts/";
  let options: RequestInit = { method: "POST" };

  if (localImageUri) {
    options.body = await preparePostFormData(content, localImageUri);
  } else {
    options.body = JSON.stringify({ content });
    options.headers = { "Content-Type": "application/json" };
  }

  return authRequest(endpoint, options, (json) => json.post as Post);
}

export async function getPosts(): Promise<Res<Post[]>> {
  return authRequest("/posts/", {
    method: "GET",
  });
}

export async function getPostsByUserId(userId: number): Promise<Res<Post[]>> {
  return authRequest(`/posts/user/${userId}`, {
    method: "GET",
  });
}

export async function getUserById(userId: number): Promise<Res<UserData>> {
  return authRequest(`/users/${userId}`, {
    method: "GET",
  });
}

export async function searchUsers(query: string): Promise<Res<UserData[]>> {
  const encodedQuery = encodeURIComponent(query);

  return authRequest(`/users/search?q=${encodedQuery}`, {
    method: "GET",
  });
}

export async function toggleLikePost(
  postId: number
): Promise<Res<LikeResponse>> {
  return authRequest(
    `/posts/${postId}/like`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
    (json) => json as LikeResponse
  );
}

export async function getPostLikers(postId: number): Promise<Res<UserData[]>> {
  return authRequest(
    `/posts/${postId}/likes`,
    {
      method: "GET",
    },
    (json) => json as UserData[]
  );
}

export async function uploadAvatar(formData: FormData): Promise<Res<UserData>> {
  try {
    const token = await getAuthToken();
    if (!token) {
      return {
        status: ResponseStatus.ERROR,
        message: "No authentication token found.",
      };
    }

    const response = await fetch(`${API_BASE_URL}/uploads/avatar`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      return { status: ResponseStatus.OK, data: result as UserData };
    } else {
      return {
        status: ResponseStatus.ERROR,
        message: result.error || `Upload failed (Status: ${response.status})`,
      };
    }
  } catch (error) {
    console.error("Upload Avatar Error:", error);
    const message =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return { status: ResponseStatus.ERROR, message };
  }
}

export async function uploadCover(formData: FormData): Promise<Res<UserData>> {
  try {
    const token = await getAuthToken();
    if (!token) {
      return {
        status: ResponseStatus.ERROR,
        message: "No authentication token found.",
      };
    }

    const response = await fetch(`${API_BASE_URL}/uploads/cover`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      return { status: ResponseStatus.OK, data: result as UserData };
    } else {
      return {
        status: ResponseStatus.ERROR,
        message:
          result.error || `Cover upload failed (Status: ${response.status})`,
      };
    }
  } catch (error) {
    console.error("Upload Cover Error:", error);
    const message =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return { status: ResponseStatus.ERROR, message };
  }
}
