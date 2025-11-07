import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserData } from "../../types/types";
import useDateFormatter from "../../hooks/useDateFormatter";
import styles from "./ProfileInfo.styles";

interface ProfileInfoProps {
  user: UserData;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const { formatDOB } = useDateFormatter();

  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <MaterialCommunityIcons
          name="email"
          size={20}
          color={styles.infoIcon.color}
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>{user.email}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons
          name="cake-variant"
          size={20}
          color={styles.infoIcon.color}
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>
          Born {formatDOB(user.date_of_birth)}
        </Text>
      </View>

      <View style={styles.infoRowLast}>
        <MaterialCommunityIcons
          name="gender-male-female"
          size={20}
          color={styles.infoIcon.color}
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>{user.gender || "Not specified"}</Text>
      </View>
    </View>
  );
};

export default ProfileInfo;
