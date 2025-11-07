import React, { useState } from "react";
import { Modal, TouchableOpacity, Text, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLanguage } from "../../locales/LanguageContext";
import { LANGUAGES, LanguageCode } from "../../locales";
import styles from "./LanguageSelector.styles";

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useLanguage();

  const languages: LanguageCode[] = ["en", "pl", "es"];

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons name="translate" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("selectLanguage")}</Text>

            <FlatList
              data={languages}
              keyExtractor={(item) => item}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.languageItem}
                  onPress={async () => {
                    await setLanguage(item);
                    setModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.languageText,
                      item === language && { fontWeight: "bold" },
                    ]}
                  >
                    {LANGUAGES[item]}
                    {item === language && " ✓"}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
