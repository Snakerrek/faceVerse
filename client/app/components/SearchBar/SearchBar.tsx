import React from "react";
import { View, TextInput } from "react-native";
import styles from "./SearchBar.styles";
import { useLanguage } from "../../locales/LanguageContext";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => {
  const { t } = useLanguage();
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={`${t("searchFriends")}...`}
        placeholderTextColor={styles.placeholder.color}
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export default SearchBar;
