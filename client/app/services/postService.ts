import { authRequest } from "../utils/authUtils";
import {
  CreatePostData,
  Post,
  Res,
  LikeResponse,
  UserData,
} from "../types/types";
import { Platform } from "react-native";

async function preparePostFormData(
  content: string,
  localImageUri: string
): Promise<FormData> {
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
}

export async function createPost(data: CreatePostData): Promise<Res<Post>> {
  const { content, localImageUri } = data;
  let options: RequestInit = { method: "POST" };

  if (localImageUri) {
    options.body = await preparePostFormData(content, localImageUri);
  } else {
    options.body = JSON.stringify({ content });
    options.headers = { "Content-Type": "application/json" };
  }

  return authRequest("/posts/", options, (json) => json.post as Post);
}

export async function getPosts(): Promise<Res<Post[]>> {
  return authRequest("/posts/", { method: "GET" });
}

export async function getPostsByUserId(userId: number): Promise<Res<Post[]>> {
  return authRequest(`/posts/user/${userId}`, { method: "GET" });
}

export async function toggleLikePost(
  postId: number
): Promise<Res<LikeResponse>> {
  return authRequest(
    `/posts/${postId}/like`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    (json) => json as LikeResponse
  );
}

export async function getPostLikers(postId: number): Promise<Res<UserData[]>> {
  return authRequest(
    `/posts/${postId}/likes`,
    { method: "GET" },
    (json) => json as UserData[]
  );
}
