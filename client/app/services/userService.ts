import { authRequest } from "../utils/authUtils";
import { UserData, Res } from "../types/types";

export async function getUserById(userId: number): Promise<Res<UserData>> {
  return authRequest(`/users/${userId}`, { method: "GET" });
}

export async function searchUsers(query: string): Promise<Res<UserData[]>> {
  const encodedQuery = encodeURIComponent(query);
  return authRequest(`/users/search?q=${encodedQuery}`, { method: "GET" });
}

export const updateUserProfile = async (
  userId: number,
  profileData: Partial<{
    bio: string;
    relationship_status: string;
    education: string;
    school: string;
    city: string;
    occupation: string;
    workplace: string;
  }>
): Promise<Res<{ user: UserData }>> => {
  return authRequest<{ user: UserData }>(`/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });
};
