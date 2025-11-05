import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./HomeHeader.styles";

interface HomeHeaderProps {
  onNotificationsPress: () => void;
  onMenuPress: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  onNotificationsPress,
  onMenuPress,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.logoText}>FaceVerse</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onNotificationsPress}
        >
          <Ionicons
            name="notifications-outline"
            size={20}
            color={styles.icon.color}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
          <Ionicons name="menu" size={20} color={styles.icon.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
