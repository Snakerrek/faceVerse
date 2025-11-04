import { authRequest } from "../utils/authUtils";
import { UserData, Res } from "../types/types";

export async function getUserById(userId: number): Promise<Res<UserData>> {
  return authRequest(`/users/${userId}`, { method: "GET" });
}

export async function searchUsers(query: string): Promise<Res<UserData[]>> {
  const encodedQuery = encodeURIComponent(query);
  return authRequest(`/users/search?q=${encodedQuery}`, { method: "GET" });
}
