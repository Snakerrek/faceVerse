import React, { useRef, useState } from "react";
import { Modal, TouchableOpacity, Text, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLanguage } from "../../locales/LanguageContext";
import { LANGUAGES, LanguageCode } from "../../locales";
import styles from "./LanguageSelector.styles";

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);
  const isClosingRef = useRef(false);

  const languages: LanguageCode[] = ["en", "pl", "es"];

  const handleSelectLanguage = async (lang: LanguageCode) => {
    isClosingRef.current = true;
    setModalVisible(false);
    await setLanguage(lang);
  };

  const handleModalClose = () => {
    isClosingRef.current = true;
    setModalVisible(false);
  };

  if (!modalVisible && isClosingRef.current) {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          isClosingRef.current = false;
          setModalVisible(true);
        }}
      >
        <MaterialCommunityIcons name="translate" size={24} color="white" />
      </TouchableOpacity>
    );
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          isClosingRef.current = false;
          setModalVisible(true);
        }}
      >
        <MaterialCommunityIcons name="translate" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={handleModalClose}
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
                  onPress={() => handleSelectLanguage(item)}
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
