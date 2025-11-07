import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./HomeHeader.styles";
import MenuModal from "../../components/MenuModal/MenuModal";
import { deleteAuthToken } from "../../utils/authUtils";
import { removeUserData } from "../../utils/storageUtils";
import { useRouter } from "expo-router";
import NotificationBell from "../NotificationBell/NotificationBell";

const HomeHeader: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await deleteAuthToken();
      await removeUserData();
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to logout");
    }
  };

  const onMenuPress = () => setShowMenu(true);
  const onNotificationsPress = () => {};

  return (
    <View style={styles.header}>
      <Text style={styles.logoText}>FaceVerse</Text>
      <View style={styles.headerIcons}>
        <NotificationBell />
        <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
          <Ionicons name="menu" size={20} color={styles.icon.color} />
        </TouchableOpacity>
      </View>
      <MenuModal
        visible={showMenu}
        onClose={() => setShowMenu(false)}
        onLogout={handleLogout}
      />
    </View>
  );
};

export default HomeHeader;
