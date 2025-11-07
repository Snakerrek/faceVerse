import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LanguageCode, getTranslation } from "../locales";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => Promise<void>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const saved = await AsyncStorage.getItem("language");
        if (saved && ["en", "pl", "es"].includes(saved)) {
          setLanguageState(saved as LanguageCode);
        }
      } catch (error) {
        console.error("Failed to load language:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLanguage();
  }, []);

  const setLanguage = async (lang: LanguageCode) => {
    try {
      setLanguageState(lang);
      await AsyncStorage.setItem("language", lang);
    } catch (error) {
      console.error("Failed to save language:", error);
    }
  };

  const t = (key: string) => getTranslation(language, key);

  if (loading) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
