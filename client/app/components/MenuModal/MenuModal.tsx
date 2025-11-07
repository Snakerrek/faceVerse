import React from "react";
import { View, Modal, Pressable } from "react-native";
import { useRouter } from "expo-router";
import styles from "./MenuModal.styles";
import MenuItem from "../MenuItem/MenuItem";

interface MenuModalProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({
  visible,
  onClose,
  onLogout,
}) => {
  const router = useRouter();

  const handleNavigate = (screen: "/profile" | "/settings") => {
    router.push(screen);
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.menuContainer}>
          <MenuItem
            icon="account"
            label="My Profile"
            onPress={() => handleNavigate("/profile")}
          />
          <MenuItem
            icon="cog"
            label="Settings"
            onPress={() => handleNavigate("/settings")}
          />
          <MenuItem
            icon="logout"
            label="Logout"
            onPress={onLogout}
            isDangerous
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default MenuModal;
