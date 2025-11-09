import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserData } from "../../types/types";
import useDateFormatter from "../../hooks/useDateFormatter";
import styles from "./ProfileInfo.styles";
import { useLanguage } from "../../locales/LanguageContext";

interface ProfileInfoProps {
  user: UserData;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const { t } = useLanguage();
  const { formatDOB } = useDateFormatter();
  const [expanded, setExpanded] = useState(false);

  const hasExpandableInfo =
    user.education ||
    user.school ||
    user.city ||
    user.occupation ||
    user.workplace;

  return (
    <View style={styles.container}>
      {user.bio && (
        <View style={styles.infoRow}>
          <MaterialCommunityIcons
            name="text"
            size={20}
            color={styles.infoIcon.color}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>{user.bio}</Text>
        </View>
      )}

      <View style={styles.infoRow}>
        <MaterialCommunityIcons
          name="gender-male-female"
          size={20}
          color={styles.infoIcon.color}
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>
          {user.gender ? t(`${user.gender}`) : t("infoMissing")}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons
          name="cake-variant"
          size={20}
          color={styles.infoIcon.color}
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>
          {t("born")}: {formatDOB(user.date_of_birth)}
        </Text>
      </View>

      {user.relationship_status && (
        <View style={styles.infoRow}>
          <MaterialCommunityIcons
            name="heart"
            size={20}
            color={styles.infoIcon.color}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>{t(user.relationship_status)}</Text>
        </View>
      )}
      {hasExpandableInfo && (
        <>
          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => setExpanded(!expanded)}
          >
            <Text style={styles.expandText}>
              {expanded ? t("showLess") : t("showMore")}
            </Text>
            <MaterialCommunityIcons
              name={expanded ? "chevron-up" : "chevron-down"}
              size={20}
              color={styles.infoIcon.color}
            />
          </TouchableOpacity>

          {expanded && (
            <>
              {user.education && (
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons
                    name="school"
                    size={20}
                    color={styles.infoIcon.color}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoText}>{t(user.education)}</Text>
                </View>
              )}

              {user.school && (
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons
                    name="book-open-variant"
                    size={20}
                    color={styles.infoIcon.color}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoText}>{user.school}</Text>
                </View>
              )}

              {user.city && (
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={20}
                    color={styles.infoIcon.color}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoText}>{user.city}</Text>
                </View>
              )}

              {user.occupation && (
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons
                    name="briefcase"
                    size={20}
                    color={styles.infoIcon.color}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoText}>{user.occupation}</Text>
                </View>
              )}

              {user.workplace && (
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons
                    name="office-building"
                    size={20}
                    color={styles.infoIcon.color}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoText}>{user.workplace}</Text>
                </View>
              )}

              <View style={styles.infoRowLast}>
                <MaterialCommunityIcons
                  name="email"
                  size={20}
                  color={styles.infoIcon.color}
                  style={styles.infoIcon}
                />
                <Text style={styles.infoText}>{user.email}</Text>
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default ProfileInfo;
