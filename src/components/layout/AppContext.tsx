import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, getLanguage, setLanguage } from "@/lib/i18n";

interface AppContextType {
  language: Language;
  setAppLanguage: (lang: Language) => void;
  primaryColor: string;
  accentColor: string;
}

const AppContext = createContext<AppContextType>({
  language: "en",
  setAppLanguage: () => {},
  primaryColor: "#FFEC5C", // New yellow gold color
  accentColor: "#FFEC5C",
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(getLanguage());
  const [primaryColor] = useState("#FFEC5C"); // Changed from #FF6B00 to #FFEC5C
  const [accentColor] = useState("#FFEC5C");

  const setAppLanguage = (lang: Language) => {
    setLanguage(lang);
    setLanguageState(lang);
  };

  // Apply CSS variables for theming
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty("--accent-color", accentColor);
  }, [primaryColor, accentColor]);

  return (
    <AppContext.Provider
      value={{
        language,
        setAppLanguage,
        primaryColor,
        accentColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
