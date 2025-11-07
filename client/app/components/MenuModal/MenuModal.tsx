import React from "react";
import { View, Modal, Pressable } from "react-native";
import { useRouter } from "expo-router";
import styles from "./MenuModal.styles";
import MenuItem from "../MenuItem/MenuItem";
import { useLanguage } from "../../locales/LanguageContext";

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
  const { t } = useLanguage();

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
            label={t("myProfile")}
            onPress={() => handleNavigate("/profile")}
          />
          <MenuItem
            icon="cog"
            label={t("settings")}
            onPress={() => handleNavigate("/settings")}
          />
          <MenuItem
            icon="logout"
            label={t("logout")}
            onPress={onLogout}
            isDangerous
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default MenuModal;
