import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";
import { UserData, ResponseStatus } from "../../types/types";
import { searchUsers } from "../../services/userService";
import { colors } from "../../theme";
import UserSearchCard from "../../components/UserSearchCard/UserSearchCard";
import styles from "./SearchScreen.styles";
import { getAuthToken } from "../../utils/authUtils";
import { useRouter } from "expo-router";
import debounce from "lodash.debounce";

const SearchScreen: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await getAuthToken();
      if (!storedToken) {
        setAuthError("You must be logged in to search.");
        Alert.alert("Error", "Authentication token not found.", [
          { text: "OK", onPress: () => router.replace("/") },
        ]);
      } else {
        setToken(storedToken);
      }
    };
    checkAuth();
  }, []);

  const performSearch = async (searchQuery: string) => {
    if (!token || searchQuery.trim() === "") {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const response = await searchUsers(searchQuery);

    if (response.status === ResponseStatus.OK && response.data) {
      setResults(response.data);
    } else {
      console.error(response.message);
      setResults([]);
    }
    setIsLoading(false);
  };

  const debouncedSearch = useMemo(() => debounce(performSearch, 300), [token]);

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  if (authError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{authError}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for users..."
          placeholderTextColor={colors.secondaryText}
          value={query}
          onChangeText={setQuery}
          autoFocus={true}
          editable={!!token}
        />
      </View>

      {isLoading && query.length > 0 && (
        <ActivityIndicator
          size="large"
          color={colors.blue}
          style={styles.loader}
        />
      )}

      {!isLoading && results.length === 0 && query.length > 0 && (
        <Text style={styles.noResultsText}>No users found.</Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserSearchCard user={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
