import { useState, useRef } from "react";
import { TextInput } from "react-native";
import { useRouter } from "expo-router";
import { ResponseStatus } from "../types/types";
import { login } from "../services/authService";

interface FormData {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>();
  const [isError, setIsError] = useState(false);

  const router = useRouter();
  const passwordInputRef = useRef<TextInput>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      setMessage("E-mail and password are required.");
      setIsError(true);
      return false;
    }
    return true;
  };

  const resetMessages = () => {
    setMessage(undefined);
    setIsError(false);
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    resetMessages();

    const loginRes = await login(formData);

    if (loginRes.status === ResponseStatus.OK) {
      router.replace("/home");
    } else {
      setMessage(loginRes.message);
      setIsError(true);
    }

    setIsLoading(false);
  };

  const focusPasswordInput = () => {
    passwordInputRef.current?.focus();
  };

  return {
    formData,
    isLoading,
    message,
    isError,
    passwordInputRef,
    handleInputChange,
    handleLogin,
    focusPasswordInput,
  };
};

export default useLoginForm;
