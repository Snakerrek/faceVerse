import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { getAuthToken } from "../utils/authUtils";

const useAuthCheck = (kickOut?: boolean, onTokenPresent?: () => void) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await getAuthToken();

      if (token) {
        if (onTokenPresent) {
          onTokenPresent();
        }
      } else {
        setIsLoading(false);
        if (kickOut) {
          router.replace("/");
        }
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

export default useAuthCheck;
