import React from "react";
import { Button } from "@/components/ui/button";
import { getLanguage, setLanguage, Language } from "@/lib/i18n";

interface LanguageToggleProps {
  onLanguageChange?: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  onLanguageChange = () => {},
}) => {
  const [language, setLanguageState] = React.useState<Language>(getLanguage());

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "es" : "en";
    setLanguage(newLanguage);
    setLanguageState(newLanguage);
    onLanguageChange(newLanguage);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-[#1A1A1A]"
    >
      <span className="font-medium">
        {language === "en" ? "🇬🇧 EN" : "🇪🇸 ES"}
      </span>
    </Button>
  );
};

export default LanguageToggle;
