import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useSearch } from "../../hooks/useSearch";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { SearchResults } from "../../components/SearchResults/SearchResults";
import { styles } from "./SearchScreen.styles";

const SearchScreen: React.FC = () => {
  const { query, setQuery, results, isLoading, authError, isAuthorized } =
    useSearch();

  if (authError && !isAuthorized) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{authError}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} />
      <SearchResults results={results} isLoading={isLoading} query={query} />
    </SafeAreaView>
  );
};

export default SearchScreen;
