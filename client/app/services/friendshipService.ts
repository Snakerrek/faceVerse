import { authRequest } from "../utils/authUtils";
import { Res, FriendshipStatus, Friend } from "../types/types";

export async function sendFriendRequest(
  addresseeId: number
): Promise<Res<void>> {
  return authRequest("/friendships/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ addressee_id: addresseeId }),
  });
}

export async function acceptFriendRequest(
  requesterId: number
): Promise<Res<void>> {
  return authRequest("/friendships/accept", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requester_id: requesterId }),
  });
}

export async function getFriendshipStatus(
  userId: number
): Promise<Res<FriendshipStatus>> {
  return authRequest(
    `/friendships/status/${userId}`,
    { method: "GET" },
    (json) => json as FriendshipStatus
  );
}

export async function getFriendsList(userId?: number): Promise<Res<Friend[]>> {
  const queryParam = userId ? `?user_id=${userId}` : "";
  return authRequest(
    `/friendships/list${queryParam}`,
    { method: "GET" },
    (json) => json as Friend[]
  );
}

export async function removeFriend(
  friendId: number
): Promise<Res<{ message: string }>> {
  return authRequest(
    `/friendships/${friendId}`,
    { method: "DELETE" },
    (json) => json as { message: string }
  );
}
