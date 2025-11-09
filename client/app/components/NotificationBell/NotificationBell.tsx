import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
} from "../../services/notificationService";
import { Notification } from "../../types/types";
import { ResponseStatus } from "../../types/enums";
import UserAvatar from "../UserAvatar/UserAvatar";
import { formatTimeAgo } from "../../utils/formatUtils";
import styles from "./NotificationBell.styles";
import { colors } from "../../theme";
import { useLanguage } from "../../locales/LanguageContext";

const NotificationBell: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();
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

  const getNotificationText = (notification: Notification) => {
    const actorName =
      notification.actor.first_name + " " + notification.actor.last_name;

    switch (notification.type) {
      case "friend_request":
        return (
          <Text>
            {t("user") + " "}
            <Text style={{ fontWeight: "bold" }}>{actorName}</Text>
            {" " + t("friendRequest")}
          </Text>
        );
      case "friend_request_accepted":
        return (
          <Text>
            {t("user") + " "}
            <Text style={{ fontWeight: "bold" }}>{actorName}</Text>
            {" " + t("friendRequestAccepted")}
          </Text>
        );
      case "new_post":
        return (
          <Text>
            {t("user") + " "}
            <Text style={{ fontWeight: "bold" }}>{actorName}</Text>
            {" " + t("newPost")}
          </Text>
        );
      case "new_comment":
        return (
          <Text>
            {t("user") + " "}
            <Text style={{ fontWeight: "bold" }}>{actorName}</Text>
            {" " + t("newComment")}
          </Text>
        );
      case "post_liked":
        return (
          <Text>
            {t("user") + " "}
            <Text style={{ fontWeight: "bold" }}>{actorName}</Text>
            {" " + t("postLiked")}
          </Text>
        );
      case "comment_liked":
        return (
          <Text>
            {t("user") + " "}
            <Text style={{ fontWeight: "bold" }}>{actorName}</Text>
            {" " + t("commentLiked")}
          </Text>
        );
      default:
        return null;
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
              <Text style={styles.modalTitle}>{t("notifications")}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={24} color={colors.primaryText} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.scrollContent}
              contentContainerStyle={styles.scrollContentContainer}
              showsVerticalScrollIndicator={true}
            >
              {loading ? (
                <View style={styles.loader}>
                  <ActivityIndicator size="large" color={colors.blue} />
                </View>
              ) : notifications.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>{t("noNotifications")}</Text>
                </View>
              ) : (
                notifications.map((item) => (
                  <TouchableOpacity
                    key={item.id}
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
                        {getNotificationText(item)}
                      </Text>
                      <Text style={styles.timestamp}>
                        {formatTimeAgo(item.created_at)}
                      </Text>
                    </View>
                    {!item.is_read && <View style={styles.unreadDot} />}
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default NotificationBell;
