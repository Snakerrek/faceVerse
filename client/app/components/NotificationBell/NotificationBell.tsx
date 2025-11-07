import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
} from "../../services/notificationService";
import { Notification, ResponseStatus } from "../../types/types";
import UserAvatar from "../UserAvatar/UserAvatar";
import { formatTimeAgo } from "../../utils/formatUtils";
import styles from "./NotificationBell.styles";
import { colors } from "../../theme";

const NotificationBell: React.FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchUnreadCount = async () => {
    try {
      const response = await getUnreadNotificationCount();
      if (response.status === ResponseStatus.OK && response.data) {
        setUnreadCount(response.data.unread_count);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await getNotifications();
      if (response.status === ResponseStatus.OK && response.data) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  const handleBellPress = async () => {
    setShowModal(true);
    await fetchNotifications();
  };

  const handleNotificationPress = async (notification: Notification) => {
    if (!notification.is_read) {
      await markNotificationAsRead(notification.id);
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }

    setShowModal(false);

    switch (notification.type) {
      case "friend_request":
        router.push(`/profile?userId=${notification.actor.id}`);
        break;

      case "new_post":
      case "post_liked":
        if (notification.post_id) {
          router.push(`/post?postId=${notification.post_id}`);
        }
        break;

      case "new_comment":
      case "comment_liked":
        if (notification.post_id) {
          router.push(`/post?postId=${notification.post_id}`);
        }
        break;

      case "friend_request_accepted":
        router.push(`/profile?userId=${notification.actor.id}`);
        break;

      default:
        break;
    }
  };

  const getNotificationText = (notification: Notification): string => {
    switch (notification.type) {
      case "friend_request":
        return "sent you a friend request";
      case "friend_request_accepted":
        return "accepted your friend request";
      case "new_post":
        return "created a new post";
      case "new_comment":
        return "commented on your post";
      case "post_liked":
        return "liked your post";
      case "comment_liked":
        return "liked your comment";
      default:
        return "";
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handleBellPress} style={styles.bellContainer}>
        <Ionicons
          name="notifications-outline"
          size={26}
          color={colors.primaryText}
        />
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {unreadCount > 9 ? "9+" : unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={showModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={24} color={colors.primaryText} />
              </TouchableOpacity>
            </View>

            {loading ? (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color={colors.blue}
              />
            ) : notifications.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No notifications</Text>
              </View>
            ) : (
              <FlatList
                data={notifications}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.notificationItem,
                      !item.is_read && styles.unreadItem,
                    ]}
                    onPress={() => handleNotificationPress(item)}
                  >
                    <UserAvatar
                      avatarUrl={item.actor.avatar_url}
                      size="small"
                    />
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationText}>
                        <Text style={styles.actorName}>
                          {item.actor.first_name} {item.actor.last_name}
                        </Text>{" "}
                        {getNotificationText(item)}
                      </Text>
                      <Text style={styles.timestamp}>
                        {formatTimeAgo(item.created_at)}
                      </Text>
                    </View>
                    {!item.is_read && <View style={styles.unreadDot} />}
                  </TouchableOpacity>
                )}
              />
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default NotificationBell;
