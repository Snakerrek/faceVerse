import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { getAuthToken } from "../utils/authUtils";

export const useAuthCheck = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await getAuthToken();

      if (token) {
        console.log("Auth token found, navigating to Home.");
        router.replace("/home");
      } else {
        console.log("No auth token found, staying on Welcome.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to load auth token:", error);
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.push("/login");
  };

  const navigateToRegister = () => {
    router.push("/register");
  };

  return {
    isLoading,
    navigateToLogin,
    navigateToRegister,
  };
};
