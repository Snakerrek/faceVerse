import React from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { UserData } from "../../types/types";
import UserSearchCard from "../UserSearchCard/UserSearchCard";
import styles from "./SearchResults.styles";
import { useLanguage } from "../../locales/LanguageContext";

interface SearchResultsProps {
  results: UserData[];
  isLoading: boolean;
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
  query,
}) => {
  const { t } = useLanguage();
  if (isLoading && query.length > 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={styles.loader.color} />
      </View>
    );
  }

  if (!isLoading && results.length === 0 && query.length > 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noResultsText}>{t("noFriendsFound")}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <UserSearchCard user={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default SearchResults;
