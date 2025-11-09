import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { UserData } from "../types/types";
import { ResponseStatus } from "../types/enums";
import { searchUsers } from "../services/userService";
import { getAuthToken } from "../utils/authUtils";
import useDebounce from "./useDebounce";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    try {
      const token = await getAuthToken();
      if (!token) {
        setAuthError("You must be logged in to search.");
        Alert.alert("Error", "Authentication token not found.", [
          { text: "OK", onPress: () => router.replace("/") },
        ]);
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setAuthError("Failed to verify authentication.");
    }
  };

  useEffect(() => {
    performSearch();
  }, [debouncedQuery]);

  const performSearch = async () => {
    if (!isAuthorized) return;

    if (debouncedQuery.trim().length === 0) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await searchUsers(debouncedQuery);

      if (response.status === ResponseStatus.OK && response.data) {
        setResults(response.data);
      } else {
        console.error("Search error:", response.message);
        setResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setQuery("");
    setResults([]);
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    authError,
    isAuthorized,
    clearResults,
  };
};

export default useSearch;
