import { authRequest } from "../utils/authUtils";
import {
  Comment,
  Res,
  CreateCommentResponse,
  LikeResponse,
  UserData,
} from "../types/types";

export async function getCommentsForPost(
  postId: number
): Promise<Res<Comment[]>> {
  return authRequest(
    `/posts/${postId}/comments`,
    { method: "GET" },
    (json) => json as Comment[]
  );
}

export async function createComment(
  postId: number,
  content: string
): Promise<Res<CreateCommentResponse>> {
  return authRequest(
    `/posts/${postId}/comment`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    },
    (json) => json as CreateCommentResponse
  );
}

export async function toggleLikeComment(
  commentId: number
): Promise<Res<LikeResponse>> {
  return authRequest(
    `/posts/comments/${commentId}/like`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    (json) => json as LikeResponse
  );
}

export async function getCommentLikers(
  commentId: number
): Promise<Res<UserData[]>> {
  return authRequest(
    `/posts/comments/${commentId}/likes`,
    { method: "GET" },
    (json) => json as UserData[]
  );
}
