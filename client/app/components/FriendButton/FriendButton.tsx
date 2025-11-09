import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import {
  sendFriendRequest,
  acceptFriendRequest,
  getFriendshipStatus,
  removeFriend,
} from "../../services/friendshipService";
import { ResponseStatus } from "../../types/enums";
import styles from "./FriendButton.styles";
import { colors } from "../../theme";
import { useLanguage } from "../../locales/LanguageContext";

interface FriendButtonProps {
  userId: number;
}

const FriendButton: React.FC<FriendButtonProps> = ({ userId }) => {
  const [status, setStatus] = useState<string>("none");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    fetchFriendshipStatus();
  }, [userId]);

  const fetchFriendshipStatus = async () => {
    try {
      const response = await getFriendshipStatus(userId);
      if (response.status === ResponseStatus.OK && response.data) {
        setStatus(response.data.status);
      }
    } catch (error) {
      console.error("Error fetching friendship status:", error);
    }
  };

  const handlePress = async () => {
    setLoading(true);
    try {
      if (status === "none") {
        const response = await sendFriendRequest(userId);
        if (response.status === ResponseStatus.OK) {
          setStatus("pending_sent");
        }
      } else if (status === "pending_received") {
        const response = await acceptFriendRequest(userId);
        if (response.status === ResponseStatus.OK) {
          setStatus("friends");
        }
      } else if (status === "friends") {
        handleRemoveFriend();
      }
    } catch (error) {
      console.error("Error handling friend action:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFriend = async () => {
    setLoading(true);
    try {
      const response = await removeFriend(userId);
      if (response.status === ResponseStatus.OK) {
        setStatus("none");
      }
    } catch (error) {
      console.error("Error removing friend:", error);
    } finally {
      setLoading(false);
    }
  };

  const getButtonConfig = () => {
    switch (status) {
      case "none":
        return {
          text: t("addFriend"),
          style: styles.addButton,
          disabled: false,
        };
      case "pending_sent":
        return {
          text: t("inviteSend"),
          style: styles.invitedButton,
          disabled: true,
        };
      case "pending_received":
        return {
          text: t("inviteAccept"),
          style: styles.acceptButton,
          disabled: false,
        };
      case "friends":
        return {
          text: t("removeFriend"),
          style: styles.friendsButton,
          disabled: false,
        };
      default:
        return {
          text: t("addFriend"),
          style: styles.addButton,
          disabled: false,
        };
    }
  };

  const config = getButtonConfig();

  return (
    <TouchableOpacity
      style={[styles.button, config.style]}
      onPress={handlePress}
      disabled={config.disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text style={styles.buttonText}>{config.text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default FriendButton;
