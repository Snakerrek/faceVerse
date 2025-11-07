import React, { useRef } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import UserAvatar from "../UserAvatar/UserAvatar";
import { colors } from "../../theme";
import styles from "./LikersModal.styles";

interface LikersModalProps {
  visible: boolean;
  onClose: () => void;
  likers: any[];
  isLoading: boolean;
  likeCount: number;
}

const LikersModal: React.FC<LikersModalProps> = ({
  visible,
  onClose,
  likers,
  isLoading,
  likeCount,
}) => {
  const router = useRouter();
  const isClosingRef = useRef(false);

  const handleLikerPress = (userId: number) => {
    isClosingRef.current = true;
    onClose();
    router.push(`/profile?userId=${userId}`);
  };

  const handleModalClose = () => {
    isClosingRef.current = true;
    onClose();
  };

  if (!visible && isClosingRef.current) {
    return null;
  }

  if (visible && isClosingRef.current) {
    isClosingRef.current = false;
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={handleModalClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={handleModalClose}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {likeCount} {likeCount === 1 ? "Like" : "Likes"}
            </Text>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={colors.blue} size="large" />
            </View>
          ) : likers.length > 0 ? (
            <FlatList
              data={likers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleLikerPress(item.id)}
                  style={styles.likerItem}
                >
                  <UserAvatar avatarUrl={item.avatar_url} size="small" />
                  <Text style={styles.likerItemText}>
                    {item.first_name} {item.last_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No likes yet</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default LikersModal;
