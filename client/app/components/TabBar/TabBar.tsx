import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme";
import styles from "./TabBar.styles";

type Tab = "home" | "search";

interface TabBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "home" && styles.tabButtonActive,
        ]}
        onPress={() => onTabChange("home")}
      >
        <Ionicons
          name={activeTab === "home" ? "home" : "home-outline"}
          size={24}
          color={activeTab === "home" ? colors.blue : colors.primaryText}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "search" && styles.tabButtonActive,
        ]}
        onPress={() => onTabChange("search")}
      >
        <Ionicons
          name={activeTab === "search" ? "search" : "search-outline"}
          size={24}
          color={activeTab === "search" ? colors.blue : colors.primaryText}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;
