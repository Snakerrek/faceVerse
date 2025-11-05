import React from "react";
import { View, Text, Modal, TouchableOpacity, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../theme";
import { styles } from "./MenuModal.styles";

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

interface MenuItemProps {
  icon: "cog" | "account" | "logout";
  label: string;
  onPress: () => void;
  isDangerous?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  onPress,
  isDangerous,
}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={isDangerous ? colors.danger : colors.primaryText}
      />
      <Text style={[styles.menuItemText, isDangerous && styles.dangerousText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuModal;
