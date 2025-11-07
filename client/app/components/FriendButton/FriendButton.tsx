import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import {
  sendFriendRequest,
  acceptFriendRequest,
  getFriendshipStatus,
  removeFriend,
} from "../../services/friendshipService";
import { ResponseStatus } from "../../types/types";
import { styles } from "./FriendButton.styles";

interface FriendButtonProps {
  userId: number;
}

const FriendButton: React.FC<FriendButtonProps> = ({ userId }) => {
  const [status, setStatus] = useState<string>("none");
  const [loading, setLoading] = useState(false);
  const [showRemoveOption, setShowRemoveOption] = useState(false);

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
        // Send friend request
        const response = await sendFriendRequest(userId);
        if (response.status === ResponseStatus.OK) {
          setStatus("pending_sent");
        }
      } else if (status === "pending_received") {
        // Accept friend request
        const response = await acceptFriendRequest(userId);
        if (response.status === ResponseStatus.OK) {
          setStatus("friends");
        }
      } else if (status === "friends") {
        handleRemoveFriend();
        setShowRemoveOption(true);
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
        setShowRemoveOption(false);
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
        return { text: "Add Friend", style: styles.addButton, disabled: false };
      case "pending_sent":
        return { text: "Invited", style: styles.invitedButton, disabled: true };
      case "pending_received":
        return {
          text: "Accept Invite",
          style: styles.acceptButton,
          disabled: false,
        };
      case "friends":
        return {
          text: "Remove",
          style: styles.friendsButton,
          disabled: false,
        };
      default:
        return { text: "Add Friend", style: styles.addButton, disabled: false };
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
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{config.text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default FriendButton;
