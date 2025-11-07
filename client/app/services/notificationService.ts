import { authRequest } from "../utils/authUtils";
import { Res, Notification, UnreadCountResponse } from "../types/types";

export async function getUnreadNotificationCount(): Promise<
  Res<UnreadCountResponse>
> {
  return authRequest(
    "/notifications/unread-count",
    { method: "GET" },
    (json) => json as UnreadCountResponse
  );
}

export async function markAllNotificationsAsRead(): Promise<Res<void>> {
  return authRequest("/notifications/mark-all-read", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
}

export async function getNotifications(): Promise<Res<Notification[]>> {
  return authRequest(
    `/notifications`,
    { method: "GET" },
    (json) => json as Notification[]
  );
}

export async function markNotificationAsRead(
  notificationId: number
): Promise<Res<void>> {
  return authRequest(`/notifications/${notificationId}/read`, {
    method: "POST",
  });
}
